const modules = import.meta.glob('../assets/gifts/*', { eager: true, import: 'default' }) as Record<
  string,
  string
>;

export const GIFT_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').pop() as string, url])
);
