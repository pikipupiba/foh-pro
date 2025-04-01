# Storybook Story Creation Plan for Auth Components

## Goal

Add Storybook stories for all components in `src/components/auth/` that do not currently have one.

## Identified Components without Stories

Based on the contents of `src/components/` and `src/stories/`, the following components require stories:

*   `src/components/auth/AuthStatus.tsx`
*   `src/components/auth/LoginForm.tsx`
*   `src/components/auth/OAuthSignInButtons.tsx`
*   `src/components/auth/SignupForm.tsx`

## Plan

1.  **Create Directory:** Create a new directory `src/stories/auth/` to maintain a parallel structure with the components directory.
2.  **Create Story Files:** Create the following new files:
    *   `src/stories/auth/AuthStatus.stories.tsx`
    *   `src/stories/auth/LoginForm.stories.tsx`
    *   `src/stories/auth/OAuthSignInButtons.stories.tsx`
    *   `src/stories/auth/SignupForm.stories.tsx`
3.  **Implement Basic Stories:** Populate each new `.stories.tsx` file with a basic Storybook setup, including:
    *   Importing the corresponding component.
    *   Default metadata (title, component).
    *   A basic "Default" story showcasing the component with necessary props (using sensible defaults or mocks).

## Proposed File Structure Changes (Mermaid Diagram)

```mermaid
graph TD
    subgraph src
        subgraph components
            subgraph auth
                A[AuthStatus.tsx]
                B[LoginForm.tsx]
                C[OAuthSignInButtons.tsx]
                D[SignupForm.tsx]
            end
            subgraph layout
                E[Footer.tsx]
                F[Header.tsx]
                G[MainLayout.tsx]
            end
        end
        subgraph stories
            subgraph auth_stories[auth]
                H(AuthStatus.stories.tsx):::new
                I(LoginForm.stories.tsx):::new
                J(OAuthSignInButtons.stories.tsx):::new
                K(SignupForm.stories.tsx):::new
            end
            subgraph layout_stories[layout]
                L[Footer.stories.tsx]
                M[Header.stories.tsx]
                N[MainLayout.stories.tsx]
            end
        end
    end
    classDef new fill:#ccffcc,stroke:#333,stroke-width:2px;