# scripts/add_shadcn_components.ps1

# List of common shadcn components to install
$components = @(
    "separator",
    "sheet",
    "dialog",
    "tabs",
    "accordion",
    "tooltip",
    "alert",
    "alert-dialog",
    "select",
    "checkbox",
    "radio-group",
    "switch",
    "textarea",
    "table",
    "skeleton",
    "sonner"
)

Write-Host "Starting shadcn component installation..."

foreach ($component in $components) {
    Write-Host "--- Adding component: $component ---"
    # Use --yes flags for non-interactive install with React 19
    npx shadcn@latest add $component --yes
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to add component: $component. Stopping script."
        # Pause to allow user to see the error before exiting
        Read-Host "Press Enter to exit"
        exit $LASTEXITCODE
    }
    Write-Host "Successfully added $component."
    Write-Host "" # Add a blank line for readability
}

Write-Host "--- All specified shadcn components added successfully. ---"