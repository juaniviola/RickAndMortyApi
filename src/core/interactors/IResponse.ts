export type IResponse<T> = {
  exercise_name: string;
  time: string;
  in_time: boolean;
  results: T[];
};
