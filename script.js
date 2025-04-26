// All genre storylines
const stories = {
        comedy: {
            start: {
                text: "You walk into a comedy club and accidentally step on the stage. The crowd is staring. What do you do?",
                choices: [
                    { text: "Crack a random joke", next: "joke" },
                    { text: "Do a silly dance", next: "dance" }
                ]
            },
            joke: {
                text: "The crowd bursts into laughter! The manager offers you a job as a comedian. What's next?",
                choices: [
                    { text: "Accept the job", next: "end" },
                    { text: "Run away in embarrassment", next: "run" }
                ]
            },
            dance: {
                text: "Your silly dance earns you a standing ovation! What do you do?",
                choices: [
                    { text: "Take a bow", next: "end" },
                    { text: "Ask for tips", next: "money" }
                ]
            },
            run: {
                text: "You trip over a mic cable and fall. The crowd roars with laughter. You become a viral meme.",
                choices: [{ text: "End the story", next: "end" }]
            },
            money: {
                text: "The crowd throws coins at you. You leave richer and happier.",
                choices: [{ text: "End the story", next: "end" }]
            }
        },
    
        romance: {
            start: {
                text: "You bump into a stranger at a café and spill their coffee. They smile warmly. What do you do?",
                choices: [
                    { text: "Apologize and offer to buy another", next: "buy_coffee" },
                    { text: "Run away in embarrassment", next: "run" }
                ]
            },
            buy_coffee: {
                text: "They accept your offer. You sit down and chat. Do you...",
                choices: [
                    { text: "Ask them on a date", next: "date" },
                    { text: "Offer your phone number", next: "number" }
                ]
            },
            date: {
                text: "You both enjoy a lovely date at the park and fall in love.",
                choices: [{ text: "End the story", next: "end" }]
            },
            number: {
                text: "You exchange numbers and part ways, hoping to meet again.",
                choices: [{ text: "End the story", next: "end" }]
            },
            run: {
                text: "You dash out of the café and later regret not talking to them.",
                choices: [{ text: "End the story", next: "end" }]
            }
        },
    
        adventure: {
            start: {
                text: "You discover a mysterious map leading to a hidden treasure. What do you do?",
                choices: [
                    { text: "Follow the map", next: "jungle" },
                    { text: "Ignore it", next: "ignore" }
                ]
            },
            jungle: {
                text: "You enter a dense jungle. You hear rustling nearby. What do you do?",
                choices: [
                    { text: "Investigate the sound", next: "wild_animal" },
                    { text: "Keep walking quietly", next: "treasure" }
                ]
            },
            wild_animal: {
                text: "You encounter a wild animal! You barely escape with your life.",
                choices: [{ text: "End the story", next: "end" }]
            },
            treasure: {
                text: "You discover a chest filled with gold! You are now rich beyond your dreams.",
                choices: [{ text: "End the story", next: "end" }]
            },
            ignore: {
                text: "You ignore the map and go home. You later learn someone else found the treasure.",
                choices: [{ text: "End the story", next: "end" }]
            }
        },
    
        mystery: {
            start: {
                text: "You receive an anonymous letter with a cryptic message. Do you...",
                choices: [
                    { text: "Follow the clues", next: "clues" },
                    { text: "Ignore the letter", next: "ignore" }
                ]
            },
            clues: {
                text: "The clues lead you to a secret underground lair. You find strange symbols. What do you do?",
                choices: [
                    { text: "Decipher the symbols", next: "symbols" },
                    { text: "Take photos and leave", next: "photos" }
                ]
            },
            symbols: {
                text: "You unlock a hidden chamber filled with artifacts!",
                choices: [{ text: "End the story", next: "end" }]
            },
            photos: {
                text: "You post the photos online and become famous for your discovery.",
                choices: [{ text: "End the story", next: "end" }]
            },
            ignore: {
                text: "You toss the letter. Later, you learn it led to a lost treasure.",
                choices: [{ text: "End the story", next: "end" }]
            }
        }
    };
    
    // Track current story and state
    let currentStory = null;
    let currentNode = "start";
    let storyPath = [];
    
    // Login function (email + password)
    function goToGenreSelection() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
    
        document.getElementById('login-page').style.display = "none";
        document.getElementById('genre-selection').style.display = "block";
    }
    
    // Start story from selected genre
    function startStory(genre) {
        currentStory = stories[genre];
        currentNode = "start";
        storyPath = [];
        document.getElementById('genre-selection').style.display = "none";
        document.getElementById('story-page').style.display = "block";
        loadStory();
    }
    
    // Load current story node
    function loadStory() {
        const storyDescription = document.getElementById('story-description');
        const choiceButtons = document.getElementsByClassName('choice-button');
    
        if (!currentStory[currentNode]) return;
    
        const currentData = currentStory[currentNode];
        storyDescription.textContent = currentData.text;
    
        storyPath.push({ text: currentData.text });
    
        Array.from(choiceButtons).forEach((btn, idx) => {
            btn.style.display = "none";
            if (currentData.choices[idx]) {
                btn.style.display = "block";
                btn.textContent = currentData.choices[idx].text;
                btn.onclick = () => {
                    storyPath[storyPath.length - 1].choice = currentData.choices[idx].text;
                    handleChoice(currentData.choices[idx].next);
                };
            }
        });
    }
    
    // Handle user choice
    function handleChoice(nextNode) {
        currentNode = nextNode;
        if (currentNode === "end") {
            endStory();
        } else {
            loadStory();
        }
    }
    
    // End of story, show full path
    function endStory() {
        document.getElementById('story-page').style.display = "none";
        document.getElementById('end-page').style.display = "block";
    
        const fullStory = document.getElementById('full-story-path');
        fullStory.innerHTML = "";
        storyPath.forEach((step, index) => {
            const para = document.createElement("p");
            para.innerHTML = `<strong>Step ${index + 1}:</strong> ${step.text}<br><em>Choice:</em> ${step.choice || "None"}`;
            fullStory.appendChild(para);
        });
    }
    
    // Reset back to genre selection
    function resetGame() {
        document.getElementById('end-page').style.display = "none";
        document.getElementById('genre-selection').style.display = "block";
    }