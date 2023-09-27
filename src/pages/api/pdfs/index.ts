import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { pdfValidationSchema } from 'validationSchema/pdfs';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPdfs();
    case 'POST':
      return createPdf();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPdfs() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.pdf
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'pdf'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createPdf() {
    await pdfValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.access?.length > 0) {
      const create_access = body.access;
      body.access = {
        create: create_access,
      };
    } else {
      delete body.access;
    }
    if (body?.notification?.length > 0) {
      const create_notification = body.notification;
      body.notification = {
        create: create_notification,
      };
    } else {
      delete body.notification;
    }
    if (body?.share?.length > 0) {
      const create_share = body.share;
      body.share = {
        create: create_share,
      };
    } else {
      delete body.share;
    }
    const data = await prisma.pdf.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
