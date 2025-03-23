// DOM Elements
const getAdviceBtn = document.getElementById('getAdviceBtn');
const adviceCard = document.getElementById('adviceCard');
const adviceText = document.getElementById('adviceText');
const dateTime = document.getElementById('dateTime');
const resetBtn = document.getElementById('resetBtn');
const tweetBtn = document.getElementById('tweetBtn');

// Function to fetch advice from the API
async function fetchAdvice() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    console.error('Error fetching advice:', error);
    return 'Failed to fetch advice. Please try again.';
  }
}
   
// Function to display advice in the card
async function displayAdvice() {
  const advice = await fetchAdvice();
  const now = new Date();
  const formattedDateTime = now.toLocaleString();

  adviceText.textContent = `"${advice}"`;
  dateTime.textContent = `${formattedDateTime}`;

  // Show the card and tweet button
  adviceCard.classList.remove('hidden');
  tweetBtn.classList.remove('hidden');

  // Set up the tweet button
  tweetBtn.onclick = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(advice)}`;
    window.open(tweetUrl, '_blank');
  };
}

// Function to reset the page
function resetPage() {
  adviceCard.classList.add('hidden');
  tweetBtn.classList.add('hidden');
  adviceText.textContent = '';
  dateTime.textContent = '';
}

// Event Listeners
getAdviceBtn.addEventListener('click', displayAdvice);
resetBtn.addEventListener('click', resetPage);