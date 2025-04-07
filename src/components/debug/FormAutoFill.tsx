import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface FormData {
  [key: string]: string | number | boolean;
}

// Sample data for event form
const EVENT_FORM_DATA: FormData = {
  eventName: 'Company Annual Gala',
  eventType: 'Corporate Event',
  eventDate: new Date().toISOString().split('T')[0],
  eventTime: '19:00',
  location: '123 Main Street, New York, NY',
  estimatedAttendees: 150,
  budget: 5000,
  contactName: 'John Smith',
  contactPhone: '(555) 123-4567',
  contactEmail: 'john.smith@example.com',
  additionalDetails: 'We need a full setup with sound system, lighting, and a stage for presentations.'
};

// Sample data for profile form
const PROFILE_FORM_DATA: FormData = {
  displayName: 'Jane Doe',
  phoneNumber: '(555) 987-6543',
  address: '456 Oak Avenue, San Francisco, CA',
  company: 'Acme Corporation',
  jobTitle: 'Event Manager',
  bio: 'Experienced event manager with over 10 years in the industry. Specializing in corporate events and conferences.'
};

// Sample data for contact form
const CONTACT_FORM_DATA: FormData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 456-7890',
  subject: 'Quote Request',
  message: 'I would like to request a quote for an upcoming corporate event. Please provide details on your services and pricing.'
};

const FormAutoFill: React.FC = () => {
  const [hasForm, setHasForm] = useState(false);
  const [formType, setFormType] = useState<string | null>(null);

  useEffect(() => {
    // Function to check for forms
    const checkForForms = () => {
      const forms = document.querySelectorAll('form');
      const currentPath = window.location.pathname;

      if (forms.length > 0) {
        setHasForm(true);

        if (currentPath.includes('/events/new')) {
          setFormType('event');
        } else if (currentPath.includes('/profile')) {
          setFormType('profile');
        } else if (currentPath.includes('/contact')) {
          setFormType('contact');
        } else {
          setFormType('unknown');
        }
      } else {
        setHasForm(false);
        setFormType(null);
      }
    };

    // Check immediately
    checkForForms();

    // Then check again after a delay to allow for dynamic form loading
    const timer = setTimeout(checkForForms, 1000);

    // Set up a mutation observer to detect when forms are added to the DOM
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any of the added nodes are forms or contain forms
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              if (node.tagName === 'FORM' || node.querySelector('form')) {
                checkForForms();
                break;
              }
            }
          }
        }
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const autoFillForm = () => {
    if (!hasForm) return;

    // Determine which form to fill based on the form type
    switch (formType) {
      case 'event':
        fillForm(EVENT_FORM_DATA);
        handleSpecialSelects('event');
        break;
      case 'profile':
        fillForm(PROFILE_FORM_DATA);
        break;
      case 'contact':
        fillForm(CONTACT_FORM_DATA);
        break;
      default:
        // Try to fill any form with basic inputs
        fillBasicForm();
        break;
    }

    console.log(`Auto-filled ${formType || 'unknown'} form`);
  };

  const fillForm = (data: FormData) => {
    // Fill text inputs, textareas, and selects
    Object.entries(data).forEach(([key, value]) => {
      const element = document.getElementById(key) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
      if (element) {
        console.log(`Filling element with id ${key}:`, element);

        if (element.tagName === 'SELECT') {
          // For select elements
          (element as HTMLSelectElement).value = value.toString();

          // Create and dispatch events that React can detect
          const inputEvent = new Event('input', { bubbles: true, cancelable: true });
          const changeEvent = new Event('change', { bubbles: true, cancelable: true });

          element.dispatchEvent(inputEvent);
          element.dispatchEvent(changeEvent);
        } else {
          // For inputs and textareas
          (element as HTMLInputElement | HTMLTextAreaElement).value = value.toString();

          // Create and dispatch events that React can detect
          const inputEvent = new Event('input', { bubbles: true, cancelable: true });
          const changeEvent = new Event('change', { bubbles: true, cancelable: true });

          element.dispatchEvent(inputEvent);
          element.dispatchEvent(changeEvent);
        }
      } else {
        console.log(`Element with id ${key} not found`);
      }
    });
  };

  const handleSpecialSelects = (formType: string) => {
    if (formType === 'event') {
      console.log('Handling special selects for event form');

      // Handle event type select (shadcn/ui custom select)
      const eventTypeSelect = document.querySelector('[id="eventType"]');
      if (eventTypeSelect) {
        console.log('Found event type select:', eventTypeSelect);

        // Try to click it to open the dropdown
        (eventTypeSelect as HTMLElement).click();
        console.log('Clicked event type select to open dropdown');

        // Wait for dropdown to appear and then click the option
        setTimeout(() => {
          // Try different selectors to find the option
          const selectors = [
            `[data-value="Corporate Event"]`,
            `[data-radix-collection-item]:nth-child(2)`, // Second option in the dropdown
            `.select-content [role="option"]:contains("Corporate Event")`,
            `[role="option"]:nth-child(2)` // Second option
          ];

          let optionFound = false;

          for (const selector of selectors) {
            try {
              const option = document.querySelector(selector);
              if (option) {
                console.log(`Found option with selector ${selector}:`, option);
                (option as HTMLElement).click();
                optionFound = true;
                console.log('Clicked option');
                break;
              }
            } catch (error) {
              console.log(`Error with selector ${selector}:`, error);
            }
          }

          if (!optionFound) {
            // If no option found, try to find any option
            const anyOption = document.querySelector('[role="option"]') ||
                             document.querySelector('[data-radix-collection-item]');

            if (anyOption) {
              console.log('Found an option:', anyOption);
              (anyOption as HTMLElement).click();
              console.log('Clicked option');
            } else {
              // Close the dropdown if option not found
              console.log('No option found, closing dropdown');
              document.body.click();
            }
          }
        }, 300); // Increased timeout to ensure dropdown is fully open
      } else {
        console.log('Event type select not found');
      }
    }
  };

  const fillBasicForm = () => {
    // Try to fill common form fields
    const commonFields = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '(555) 123-4567',
      message: 'This is a test message generated by the auto-fill feature.',
      subject: 'Test Subject',
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!'
    };

    // Find all inputs and textareas
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const inputElement = input as HTMLInputElement | HTMLTextAreaElement;
      const inputId = inputElement.id.toLowerCase();
      const inputName = inputElement.name.toLowerCase();
      const inputType = (inputElement as HTMLInputElement).type;

      // Skip hidden, submit, button inputs
      if (['hidden', 'submit', 'button'].includes(inputType)) return;

      // Handle checkboxes and radio buttons
      if (inputType === 'checkbox' || inputType === 'radio') {
        (inputElement as HTMLInputElement).checked = true;
        return;
      }

      // Try to match input with common fields
      for (const [key, value] of Object.entries(commonFields)) {
        if (inputId.includes(key) || inputName.includes(key)) {
          inputElement.value = value.toString();
          // Trigger input event
          const event = new Event('input', { bubbles: true });
          inputElement.dispatchEvent(event);
          break;
        }
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={autoFillForm}
      disabled={!hasForm}
      className={`text-xs ${!hasForm ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={hasForm ? `Auto-fill ${formType || 'unknown'} form` : 'No form detected on this page'}
    >
      Auto-Fill Form
    </Button>
  );
};

export default FormAutoFill;
