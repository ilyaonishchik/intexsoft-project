export class CreateAddressDto {
  country: string;
  city: string;
  zip: string;
  street: string;
  house: string;
  apartment?: string;
}
