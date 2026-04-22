# Vanilla Cards Feature Scaffold

Copy this scaffold when creating a new interactive `vanilla-cards` feature.

Recommended workflow:

1. Copy `feature/` to the target location such as `mark/components/my-feature/`
2. Rename placeholders:
   - `FeatureController` -> your controller name
   - `FeatureConfig` -> your config type
   - `FeatureModel` -> your normalized UI model
   - `feature-root` / `feature` BEM block -> your block name
3. Copy `entry-point.ts.template` into the appropriate entry-point directory
4. Copy `styles/feature.css` into the right styles location and rename selectors
5. Keep the boundary flow:
   `raw payload -> normalize*() -> UI model -> controller`

Naming note:

- Use `card` in the copied module name only if the new module is primarily a reusable presentation component.
- For editors, workflows and admin tools, prefer domain names like `article-editor`, `media-library`, `settings-form`.

Files included:

- `feature/index.ts`: public feature API
- `feature/types.ts`: config, UI model and raw payload types
- `feature/normalizers.ts`: snake_case/camelCase and legacy fallback handling
- `feature/controller.ts`: DOM binding and orchestration
- `feature/feature.test.ts`: minimum Vitest coverage
- `entry-point.ts.template`: thin entry point bootstrap
- `styles/feature.css`: BEM and token-based CSS skeleton
