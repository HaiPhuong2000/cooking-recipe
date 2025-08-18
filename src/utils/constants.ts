export const DIFFICULTY_LEVELS = {
  all: 'Tất cả mức độ',
  easy: 'Dễ',
  medium: 'Trung bình',
  difficult: 'Khó',
} as const;

export const RATING_FILTERS = {
  all: 'Tất cả đánh giá',
  five: '5 sao',
  four_plus: 'Trên 4 sao',
  three_plus: 'Trên 3 sao',
} as const;

export const COOKING_TIME_FILTERS = {
  all: 'Tất cả thời gian',
  under_15: 'Dưới 15 phút',
  under_30: 'Dưới 30 phút',
  under_60: 'Dưới 1 tiếng',
} as const;

export const SORT_OPTIONS = {
  newest: 'Mới nhất',
  oldest: 'Cũ nhất',
} as const;

export const FILTER_VALUES = {
  rating: {
    five: 5,
    four_plus: 4,
    three_plus: 3,
  },
  cooking_time: {
    under_15: 15,
    under_30: 30,
    under_60: 60,
  },
} as const;

export type FilterOptions = {
  difficulty_level?: keyof typeof DIFFICULTY_LEVELS;
  rating?: keyof typeof RATING_FILTERS;
  cooking_time?: keyof typeof COOKING_TIME_FILTERS;
  sort?: keyof typeof SORT_OPTIONS;
};

export const DEFAULT_LIMIT = 10;
export const DEFAULT_COUNTRY = 'Tất cả';
