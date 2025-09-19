export const BREAKPOINTS = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
} as const;

export const MEDIA_QUERIES = {
  XS: `@media (max-width: ${BREAKPOINTS.XS}px)`,
  SM: `@media (max-width: ${BREAKPOINTS.SM}px)`,
  MD: `@media (max-width: ${BREAKPOINTS.MD}px)`,
  LG: `@media (max-width: ${BREAKPOINTS.LG}px)`,
  XL: `@media (max-width: ${BREAKPOINTS.XL}px)`,
  XXL: `@media (max-width: ${BREAKPOINTS.XXL}px)`,
} as const;
