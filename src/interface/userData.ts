export interface UserData {
  picture?: {
    large: string;
  };
  name?: {
    title: string;
    first: string;
    last: string;
  };
  location?: {
    country: string;
    state: string;
    coordinates?: {
      latitude: string;
      longitude: string;
    };
  };
  phone?: string;
  dob?: {
    age?: string;
  };
  email?: string;
}
