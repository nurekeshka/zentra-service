import { Observable } from 'rxjs';

export type MaybeAsync<T> = T | Promise<T> | Observable<T>;

export type ProcessEnv = 'development' | 'production' | 'test';
