#!/usr/bin/env bash

# create_fohpro_structure.sh
# Creates the recommended folder structure for the "foh-pro" project.

# 1. Define the base project folder name
PROJECT_NAME="foh-pro"

# 2. Create the directories
mkdir -p $PROJECT_NAME/.github/workflows
mkdir -p $PROJECT_NAME/docs/architecture
mkdir -p $PROJECT_NAME/docs/design
mkdir -p $PROJECT_NAME/public/images
mkdir -p $PROJECT_NAME/src/pages/api/auth
mkdir -p $PROJECT_NAME/src/pages/api/integrations
mkdir -p $PROJECT_NAME/src/features/home
mkdir -p $PROJECT_NAME/src/features/product-service-listings
mkdir -p $PROJECT_NAME/src/features/customer-portal/pre-rental
mkdir -p $PROJECT_NAME/src/features/customer-portal/event-planning
mkdir -p $PROJECT_NAME/src/features/customer-portal/post-event
mkdir -p $PROJECT_NAME/src/features/customer-portal/components
mkdir -p $PROJECT_NAME/src/features/employee-portal/logistics
mkdir -p $PROJECT_NAME/src/features/employee-portal/workflow
mkdir -p $PROJECT_NAME/src/features/employee-portal/components
mkdir -p $PROJECT_NAME/src/features/admin-portal/dashboards
mkdir -p $PROJECT_NAME/src/features/admin-portal/components
mkdir -p $PROJECT_NAME/src/components/layout
mkdir -p $PROJECT_NAME/src/components/ui
mkdir -p $PROJECT_NAME/src/components/forms
mkdir -p $PROJECT_NAME/src/hooks
mkdir -p $PROJECT_NAME/src/contexts
mkdir -p $PROJECT_NAME/src/store
mkdir -p $PROJECT_NAME/src/lib
mkdir -p $PROJECT_NAME/src/services
mkdir -p $PROJECT_NAME/src/styles
mkdir -p $PROJECT_NAME/src/utils
mkdir -p $PROJECT_NAME/tests/unit
mkdir -p $PROJECT_NAME/tests/integration
mkdir -p $PROJECT_NAME/tests/e2e/cypress
mkdir -p $PROJECT_NAME/storybook/stories
mkdir -p $PROJECT_NAME/scripts

# 3. Create a few placeholder files (optional)
touch $PROJECT_NAME/.gitignore
touch $PROJECT_NAME/README.md
touch $PROJECT_NAME/package.json
touch $PROJECT_NAME/tsconfig.json
# touch $PROJECT_NAME/tailwind.config.js  # Not needed with Tailwind v4.0
touch $PROJECT_NAME/next.config.js
touch $PROJECT_NAME/firebase.json
touch $PROJECT_NAME/firestore.rules
touch $PROJECT_NAME/firestore.indexes.json

# 4. Print completion message
echo "Folder structure for '$PROJECT_NAME' created successfully!"
