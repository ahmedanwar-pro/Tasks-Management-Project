# Global Store

`makeStore()` creates the Redux Toolkit store inside the client `Providers`
boundary. Redux Toolkit configures thunk middleware by default, so slices can
add async thunks later without additional setup. `AppThunk` is exported from
`store/index.ts` for typed custom thunks.

## User State

Client components can read the logged-in user with `useAppSelector` and update
it with typed dispatch:

```tsx
const user = useAppSelector(selectCurrentUser);
const dispatch = useAppDispatch();

dispatch(updateUser({ jobTitle: 'Product Manager' }));
dispatch(clearUser());
```

The existing session listener dispatches `setUser` when a user is available
and `clearUser` when the session is removed.

## Adding A Slice

1. Create a folder under `store/features/` with its slice, types, and optional
   selectors.
2. Import its reducer into `store/index.ts`.
3. Add it to the `reducer` object passed to `configureStore`.
