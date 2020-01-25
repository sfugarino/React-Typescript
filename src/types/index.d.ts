export interface DetailProps {
  match: {
    path: string;
    url: string;
    isExact: boolean;
    params: {
      id: string;
    };
  };
}

export interface User {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
}

export interface Location {
  city: string;
  country?: string;
  address2?: string;
  address3?: string;
  state: string;
  address1: string;
  zip_code: string;
}

export interface Review {
  id: string;
  rating: number;
  user: User;
  text: string;
  time_created: string;
  url: string;
}

export enum Direction {
  pickup,
  delivery,
  restaurant_reservation
}

export interface Business {
  rating: number;
  price?: string;
  phone?: string;
  id?: string;
  alias?: string;
  is_closed?: boolean;
  categories?: [
    {
      alias?: string;
      title?: string;
    }
  ];
  review_count?: number;
  name?: string;
  url?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  image_url?: string;
  location: Location;
  distance?: number;
  transactions?: Direction[];
  reviews?: Review[];
}

export interface StarOptions {
  fillId: string;
  changeRating?: MouseEvent<HTMLDivElement, MouseEvent>;
  hoverOverStar?: MouseEvent<HTMLDivElement, MouseEvent>;
  unHoverOverStar?: MouseEvent<HTMLDivElement, MouseEvent>;
  isStarred: boolean;
  isPartiallyFullStar: boolean;
  isHovered: boolean;
  hoverMode: boolean;
  isCurrentHoveredStar: boolean;
  isFirstStar: boolean;
  isLastStar: boolean;
  starDimension: string;
  starSpacing: string;
  starHoverColor: string;
  starRatedColor: string;
  starEmptyColor: string;
  gradientPathName: string;
  ignoreInlineStyles: boolean;
  svgIconPath: string;
  svgIconViewBox: string;
}
