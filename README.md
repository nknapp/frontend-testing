# Demo project for my talks about frontend testing and eslint

For some reason, we still don't like writing test for web-frontends. Most backend developers do it,
frontend devs often don't. And if they do, they get frustrated. But what can we do?

This repo contains the demo application for my talk about frontend testing, with examples that I use in the talk.
You can have a look and try out things with this repo.

It is **not** intended to be a fully tested, working and deployable app. It is an example for project setup
and unit testing. Please do not copy & paste without thinking. Use this as inspiration only.

### Mock-Service-Worker

This was not part of the talk. In order to simplify the use of mock-apis, we write a small wrapper
around [mswjs.io](https://mswjs.io).

- In [setup.ts](src/test-setup/setup.ts), the file [mock-api.test-helper.ts](src/test-utils/mock-api.test-helper.ts) is
  included, which initializes a default mock api
- Default mocks for all endpoint should be provided in the setup function
- The function `useRequestHandlers` can be used to override the default request handlers for specific test cases.
- [src/test-utils/mock-requestHandlers](src/test-utils/mock-requestHandlers) contains the factory functions for
  request-handlers, simplifying the override in test-cases. Maybe it would be better to move it so `src/backend`.
- The `mock-api.test-helper` module also collects sent requests and exports the function `getSentRequests` so that
  api-calls can be verified in the test. This is a very basic facility, which could be improved, but for this repo,
  I wanted to keep it simple.

## eslint

I created the eslint-config with

```bash
npm init @eslint/config@latest
```

and then found my way from there. You can check the git-history for the different things I added.
Run `npm run test:lint` to run eslint

## Playwright Visual Regression Testing

For my talk at the [enterJS 2025](https://enterjs.de/) I added Playwright and some visual regression tests.

In this project:

- [playwright.config.ts](./playwright.config.ts)
- [playwright-docker](./playwright-docker)
- [playwright-test](./playwright-test)
- I also changed the [vite.config.ts](./vite.config.ts) to run only `*.test.ts` in vitest, so that vitest does
  not try to run Playwright tests

Links:

- [Snapshot Path Template](https://playwright.dev/docs/api/class-testproject#test-project-snapshot-path-template)
- [Handling animations](https://playwright.dev/docs/api/class-page#page-screenshot-option-animations)
- [expect.toHaveScreenshot](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)
- [Google Gemini about prevent Video Playback](https://g.co/gemini/share/fb30e5cf7780)

The Playwright setup runs the browsers in a docker container to provide the same environment on all platforms and
make visual comparisons possible.

## Other References

- ["Coding a better world together", by Rabobank](https://www.youtube.com/watch?v=7EmboKQH8lM&list=PLKfeKWitifFjqeKI1zU3mwK0hw6wtR5vi&index=1): Six 90 minutes presentations with Robert C. Martin about various topics.
  - [Demo of test driven development](https://www.youtube.com/watch?v=58jGpV2Cg50&t=2628s) in that series
- https://testing-library.com/
  - [Types of quries](https://testing-library.com/docs/queries/about#types-of-queries)
  - [User events](https://testing-library.com/docs/user-event/intro)
  - [pointerEventsCheck config option](https://testing-library.com/docs/user-event/options#pointereventscheck)
- Icons of this demo app: https://uxwing.com/
- My old talk from 2021 about mocking, with React examples
  - Note that this talk uses an old mock-service-worker version, and jest+webpack
  - [Example repo](https://github.com/cosee/techtalk-2021-10-test-it-mock-it)
  - [Youtube video](https://youtu.be/t7SKh7QFgOo)
- eslint reference
  - [Talk slides](./slides/Code-Review-Eslint.pdf)
  - The [eslint homegpage](https://eslint.org/)
  - [Builtin rules](https://eslint.org/docs/latest/rules/)
  - [How to write custom rules](https://eslint.org/docs/latest/extend/custom-rules)
  - [AST explorer](https://astexplorer.net/)
  - [Selector syntax](https://eslint.org/docs/latest/extend/selectors)
