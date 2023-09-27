import { FileType, SupportFileType } from '../enums/file.enum';

export const ABILITY_METADATA_KEY = 'ability';
export enum PrefixType {
  ADMIN = 'admin',
  USER = 'user',
}

export const HASH_ROUND = 12;

export const MapFilePathSupport = [
  {
    key: FileType.IMAGE,
    types: ['png', 'jpg', 'jpeg'],
  },
  {
    key: FileType.PDF,
    types: ['pdf'],
  },
  {
    key: FileType.AUDIO,
    types: ['mp3', 'mp4', 'wav'],
  },
  {
    key: FileType.EXCEL,
    types: [SupportFileType.xlsx, SupportFileType.xls],
  },
  {
    key: FileType.CSV,
    types: [SupportFileType.csv, SupportFileType.csv],
  },
];

export const TIME_ZONE = 'Asia/Ho_Chi_Minh';
export const TIME_FORMAT_DAY = 'YYYY-MM-DD';
export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const MAX_LENGTH_CONTENT = 100000;

export const LIST_FOLDER = [
  'MO_POST_FILES_FOLDER',
  'MOTEL_FILES_FOLDER',
  'CONTRACT_FILES_FOLDER',
  'BILL_FILES_FOLDER',
  'RENTER_FILES_FOLDER',
  'PROBLEM_FILES_FOLDER',
  'ANOTHER_FILES_FOLDER',
];
