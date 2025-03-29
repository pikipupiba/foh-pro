#!/usr/bin/env bash

mkdir -p foh-pro/.github/workflows \
         foh-pro/docs/architecture \
         foh-pro/docs/design \
         foh-pro/public/images \
         foh-pro/src/pages/api/auth \
         foh-pro/src/pages/api/integrations \
         foh-pro/src/features/home \
         foh-pro/src/features/product-service-listings \
         foh-pro/src/features/customer-portal/pre-rental \
         foh-pro/src/features/customer-portal/event-planning \
         foh-pro/src/features/customer-portal/post-event \
         foh-pro/src/features/customer-portal/components \
         foh-pro/src/features/employee-portal/logistics \
         foh-pro/src/features/employee-portal/workflow \
         foh-pro/src/features/employee-portal/components \
         foh-pro/src/features/admin-portal/dashboards \
         foh-pro/src/features/admin-portal/components \
         foh-pro/src/components/layout \
         foh-pro/src/components/ui \
         foh-pro/src/components/forms \
         foh-pro/src/hooks \
         foh-pro/src/contexts \
         foh-pro/src/store \
         foh-pro/src/lib \
         foh-pro/src/services \
         foh-pro/src/styles \
         foh-pro/src/utils \
         foh-pro/tests/unit \
         foh-pro/tests/integration \
         foh-pro/tests/e2e/cypress \
         foh-pro/storybook/stories \
         foh-pro/scripts

touch foh-pro/.gitignore \
      foh-pro/README.md \
      foh-pro/package.json \
      foh-pro/tsconfig.json \
      foh-pro/tailwind.config.js \
      foh-pro/next.config.js \
      foh-pro/firebase.json \
      foh-pro/firestore.rules \
      foh-pro/firestore.indexes.json
