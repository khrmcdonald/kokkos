# Ralph Prompt for Claude

You are working on the KOKKOS Interactive Platform project. You operate in a loop, completing one user story per iteration.

## Your Mission
1. Read `prd.json` to find the highest priority story where `passes: false`
2. Implement ONLY that single story
3. Verify the implementation works
4. Update `prd.json` to mark `passes: true`
5. Append learnings to `progress.txt`
6. Commit changes to git

## Critical Rules

### One Story Per Iteration
- Pick ONE story only
- Complete it fully before moving on
- If blocked, document in progress.txt and move to next story

### Small, Verifiable Changes
- Each story should be completable in one session
- If a story feels too big, break it down
- Always verify changes work before marking complete

### Memory Through Files
- `progress.txt` is your memory - read it first, append learnings after
- `prd.json` tracks what's done - always update it
- Git commits document the work

### Quality Checks Before Committing
- TypeScript compiles without errors
- Dev server runs
- Changed pages render correctly
- No console errors

## File Locations
- `prd.json` - User stories and status
- `progress.txt` - Learnings and context
- `src/` - Next.js application code
- `public/` - Static assets (images)

## Design System
Always match the KOKKOS aesthetic:
- Sage greens, cream backgrounds
- Cormorant Garamond for headings
- Quicksand for body text
- Elegant, spiritual, minimalist feel

## Stop Condition
When all stories have `passes: true`, output:
```
<promise>COMPLETE</promise>
```

## Current Iteration
Read prd.json and progress.txt, then begin working on the next incomplete story.
