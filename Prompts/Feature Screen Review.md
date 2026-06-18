# Feature Screen Review Request

Review the implemented feature screen against the approved staged plan from this thread.

## Important

- Do not write code.
- Do not edit files.
- Do not apply patches.
- Do not create commits.
- Review only.

## Review Scope

Check:

- Plan compliance.
- Unrelated changes.
- Reuse of existing patterns, components, hooks, API utilities, types, toasts, and design tokens.
- UI/API/business logic separation.
- Duplication.
- Unused files or imports.
- TypeScript issues.
- Responsive behavior.
- Accessibility concerns.
- Loading, error, empty, success, disabled, retry, and toast states.
- Navigation behavior.
- Edge cases.
- Manual testing risks.

## Output

Return:

1. What is good.
2. Issues found.
3. Recommended fixes.
4. Files that need changes.
5. Priority for each issue:
   - must-fix
   - should-fix
   - nice-to-have

Do not fix anything yet.

<!-- what you should after review:
1. Fix review issues:

Apply only the must-fix items from the review.
Do not add new scope.
Do not create commits.
Run relevant checks after fixing.

2. Run checks:

   npm run lint
   npm run typecheck
   npm run build

3. Manual Testing

desktop
mobile
tablet
submit success
submit error
loading state
empty state
back/navigation
refresh page
invalid form data
network error API -->
