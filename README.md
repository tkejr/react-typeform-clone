# React Typeform Clone Component

This is a React component inspired by Typeform's smooth and user-friendly forms. This component allows developers to achieve a Typeform-like user experience in their React applications without the overhead of using Typeform's API or services.

## Installation

```bash
npm install react-typeform-clone
```
Props
questions (Array of Strings, required): The array of questions to be displayed in the form.
onSubmit (Function, required): A callback function that gets triggered when the form is submitted. The function will receive the form data as its argument.

## Usage 
```javascript
import TypeformLikeForm from 'react-typeform-clone';

function App() {
    const questions = [
        "What's your name?",
        "How do you feel today?",
        // ... other questions
    ];

    const handleFormSubmit = (data) => {
        console.log(data); // logs the form's data
        // Handle the form data submission logic here.
    };

    return (
        <TypeformLikeForm questions={questions} onSubmit={handleFormSubmit} />
    );
}

export default App;
```

## How It Works
Upon using the TypeformLikeForm component, users are presented with a form that closely resembles Typeform's design. As each question is answered, a progress bar is updated, allowing navigation between questions. When all questions are answered, the form can be submitted, triggering the onSubmit callback, which then receives the form data.

This component ensures navigation between questions is smooth, providing a seamless experience for end-users.

## Styling
While the component has built-in styles, these can easily be overridden or complemented with custom CSS classes or styles as per your requirements.

## Support & Contribution
If you encounter issues, please open an issue on the [GitHub Repository](https://github.com/tkejr/react-typeform-clone)
. We welcome contributions in the form of pull requests!