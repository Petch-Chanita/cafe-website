import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  cafe_id: string
  username:string;
  image:string;
}