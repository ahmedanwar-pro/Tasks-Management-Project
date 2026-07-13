Review only [feature screen name] against the approved staged plan and later approved decisions from this thread.

Do not edit files, patch, stage, or commit.

Keep the review focused. Inspect only files directly related to:

- the screen
- its components/hooks/api/types/utils
- navigation entry/icon if changed
- shared status config only if used by this screen

Check:

- plan compliance
- filter/data consistency
- loading/error/empty/disabled/retry states
- responsive behavior, especially 1024px
- accessibility basics
- duplication or unused imports
- unrelated changes inside the touched diff

Do not do broad repo refactors or inspect unrelated modules unless a direct import/dependency requires it.

Return a concise report:

1. Good
2. Issues found
3. Recommended fixes
4. Files needing changes
5. Priority: must-fix / should-fix / nice-to-have

Review only. Do not fix anything yet.
