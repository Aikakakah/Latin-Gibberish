// Latin suffixes to add to reversed words
const latinSuffixes = ['us', 'um', 'it', 'is', 'ae', 'i', 'o', 'em', 'es', 'ibus'];

// Protected words that should not be converted
const protectedWords = ['nar\'sie', 'ratvar'];

// Function to get a random Latin suffix
function getRandomLatinSuffix() {
    return latinSuffixes[Math.floor(Math.random() * latinSuffixes.length)];
}

// Function to convert a word to Latin Gibberish
function convertToLatinGibberish(word) {
    // Check if the word is protected (case-insensitive)
    if (protectedWords.some(protected => protected.toLowerCase() === word.toLowerCase())) {
        return word;
    }
    
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
    
    // First, handle text within parentheses
    let processedText = englishInput;
    const parenthesesMatches = englishInput.match(/\(([^)]+)\)/g) || [];
    
    // Replace each parenthetical content with a placeholder
    parenthesesMatches.forEach((match, index) => {
        const content = match.slice(1, -1); // Remove the parentheses
        processedText = processedText.replace(match, `__PAREN_${index}__`);
    });
    
    // Split the text into words, keeping punctuation and apostrophes
    const words = processedText.match(/\b[\w']+\b|\W+/g) || [];
    
    // Convert each word to Latin Gibberish
    const convertedWords = words.map(word => {
        // Check if this is a placeholder for parenthetical content
        const parenMatch = word.match(/__PAREN_(\d+)__/);
        if (parenMatch) {
            // Restore the original parenthetical content
            return parenthesesMatches[parseInt(parenMatch[1])].slice(1, -1);
        }
        
        // Only convert actual words (not punctuation or spaces)
        if (/\w/.test(word)) {
            return convertToLatinGibberish(word);
        }
        return word;
    });
    
    // Join the converted words back together and clean up extra spaces
    latinOutput.textContent = convertedWords.join('').replace(/\s+/g, ' ').trim();
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