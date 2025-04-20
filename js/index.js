// Latin suffixes to add to reversed words
const latinSuffixes = ['us', 'um', 'it', 'is', 'ae', 'i', 'o', 'em', 'es', 'ibus'];

// Function to get a random Latin suffix
function getRandomLatinSuffix() {
    return latinSuffixes[Math.floor(Math.random() * latinSuffixes.length)];
}

// Function to convert a word to Latin Gibberish
function convertToLatinGibberish(word) {
    // Check if the word starts with a capital letter
    const isCapitalized = /^[A-Z]/.test(word);
    
    // Convert to lowercase for reversal
    const lowerWord = word.toLowerCase();
    
    // Reverse the word
    const reversed = lowerWord.split('').reverse().join('');
    
    // Add a random Latin suffix
    const withSuffix = reversed + getRandomLatinSuffix();
    
    // Capitalize the first letter if the original word was capitalized
    return isCapitalized ? withSuffix.charAt(0).toUpperCase() + withSuffix.slice(1) : withSuffix;
}

// Function to convert text to Latin Gibberish
function convertText() {
    const englishInput = document.getElementById('english-input').value;
    const latinOutput = document.getElementById('latin-output');
    
    // Split the text into words, keeping punctuation
    const words = englishInput.match(/\b\w+\b|\W+/g) || [];
    
    // Convert each word to Latin Gibberish
    const convertedWords = words.map(word => {
        // Only convert actual words (not punctuation or spaces)
        if (/\w/.test(word)) {
            return convertToLatinGibberish(word);
        }
        return word;
    });
    
    // Join the converted words back together
    latinOutput.textContent = convertedWords.join('');
}

// Function to copy text to clipboard
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Show a brief visual feedback
        const button = document.querySelector(`#${elementId} + .copy-button`);
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
            button.innerHTML = originalIcon;
        }, 1000);
    });
}

// Add event listener for input changes
document.getElementById('english-input').addEventListener('input', convertText); 