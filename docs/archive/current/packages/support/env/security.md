---
title: Security
description: Security Considerations when working with env files
sidebarDepth: 0
---

# Security

You should be very mindful what environment variables you chose to expose in your runtime environment.
If you are parsing `.env` files and injecting them into your runtime, please consider using a dedicated
file for your front-end application only (_e.g. name it `.front-end`, `.browser` or something similar._).
It is important that you are able to clearly distinguish between environment variables for your backend, and
for your front-end. You do not want to end up in a situation where you accidentally expose sensitive variables
to the front-end!

Furthermore, the `Env` component is **_NOT_** able to prevent unintended access to the environment variables, that you
may choose to expose to your front-end application. You should always assume that
**_all_** environment variables are **_PUBLICLY AVAILABLE_**, in the browser!

For additional information concerning `.env` files and environment variables, consider reading the
following articles:

* [What is the use of .env file in projects?](https://medium.com/@sujathamudadla1213/what-is-the-use-of-env-8d6b3eb94843)
* [Best practices for managing and storing secrets in frontend development](https://blog.logrocket.com/best-practices-for-managing-and-storing-secrets-in-frontend-development/)
* [It’s time to deprecate the .env file](https://medium.com/@tony.infisical/its-time-to-deprecate-the-env-file-for-a-better-stack-a519ac89bab0)
* [How to improve the security of your frontend](https://community.aws/content/2djybfoALqneZO9EA2UA7a5lCbn/how-to-improve-the-security-of-your-frontend-application-using-aws-secret-manager)