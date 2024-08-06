declare module "ec-docs-validator" {
  export function ci(ci): boolean;
  export function ruc(ruc): boolean;
  export function cellphone(cellphone): boolean;
  export function telephone(telephone): boolean;
  export function plates(plate): boolean;
  export function zipCode(zipCode): boolean;
}
