const mapping: Record<string, string> = {
  accesses: 'access',
  companies: 'company',
  notifications: 'notification',
  pdfs: 'pdf',
  shares: 'share',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
