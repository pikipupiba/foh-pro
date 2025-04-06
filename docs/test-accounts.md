# Test Accounts

The application includes pre-configured test accounts for development and testing purposes. These accounts have different roles and permissions:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `manager@google.com` | `password123` | Admin | Full access to all features and admin capabilities |
| `employee@google.com` | `password123` | Employee | Access to employee portal and features |
| `customer@google.com` | `password123` | Customer | Access to customer portal and features |

## Setting Up Test Accounts

To set up these test accounts in your Firebase project, run:

```bash
npm run setup-test-accounts
```

This script will:
1. Create the user accounts in Firebase Authentication if they don't exist
2. Set the appropriate roles in Firestore
3. Configure the necessary permissions

## Using Test Accounts

These accounts can be used for:
- Development and testing of role-specific features
- Demonstrating the application to stakeholders
- Testing user flows and permissions
- Automated testing

## Security Considerations

- These accounts are for development and testing only
- Do not use them in production environments
- The passwords are intentionally simple for testing purposes
- In production, enforce strong password policies

## Firestore Rules

The Firestore security rules include special handling for these test accounts to make development easier. In production, these special rules should be removed.

```javascript
// Checks if the user is one of our test accounts
function isTestAccount() {
  return isAuthenticated() && 
         (request.auth.token.email == 'manager@google.com' || 
          request.auth.token.email == 'employee@google.com' || 
          request.auth.token.email == 'customer@google.com');
}
```
