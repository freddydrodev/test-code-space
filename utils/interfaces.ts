import { Timestamp } from "firebase/firestore";

export interface IText {
  fr?: string;
  en?: string;
  es?: string;
}

interface IDocument {
  _id?: string;
  createdAt?: Timestamp;
}

export interface IBannerDocument extends IDocument {
  image: string;
  title: IText;
  description: IText;
}

export interface IMissionDocument extends IBannerDocument {}

export interface IActivityDocument extends IDocument {
  images: string[];
  title: IText;
  contentText: IText;
  contentHtml: IText;
}

export interface IServiceDocument extends IDocument {
  image: string;
  name: IText;
  description: IText;
}

export interface ILocationDocument extends IDocument {
  city: string;
  location: string;
  phones: string;
  emails: string;
  description: IText;
}

export interface ITeamDocument extends IDocument {
  image: string;
  fullname: string;
  role: IText;
  description: IText;
}
