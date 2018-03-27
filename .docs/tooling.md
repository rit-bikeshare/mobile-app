# Tooling
We have some tooling setup to enforce code style and keep everything organized.

### Git hooks
We have git hooks that run on commit and push.
If your hooks aren't running run:
```bash
$ yarn fix-githooks
```

### Prettier
Prettier is what helps us to enforce code style. If your githook fails, the best solution is to run
```bash
$ yarn prettier:write
```

The best thing to do would be to install an extension on your code editor to auto prettify on save.

### es-lint
This is helps with catching errors before you commit them. You should install a linter on your code editor, but the githooks will also catch any errors es-lint might find.
