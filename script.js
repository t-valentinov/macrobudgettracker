// --- GLOBAL CONSTANTS ---
const LOG_KEY = 'macroFuelLogEntries';
const STORES_KEY = 'macroFuelStores';
const PRICES_KEY = 'macroFuelPrices';

// Macros per 100g or per unit. isUnit: true means the amount entered is 1 unit.
const DEFAULT_MACROS = {
    // --- MEATS & DAIRY CORE (Per 100g unless noted) ---
    "Chicken Breast (Cooked)": { P: 31.0, C: 0, F: 3.6, calories: 165, isUnit: false },
    "Eggs": { P: 6.3, C: 0.6, F: 5.3, calories: 77.5, isUnit: true }, // Per 1 large egg
    "Ground Beef": { P: 17.33, C: 0, F: 2.85, calories: 98, isUnit: false }, // Corrected comma
    "Canned Tuna": { P: 25.5, C: 0, F: 0.8, calories: 109.2, isUnit: false },

    // MILK (Per 100g)
    'Milk (Whole - approx. 3.5% F)': { P: 3.3, C: 4.8, F: 3.3, calories: 61, isUnit: false },
    'Milk (Semi-Skimmed - approx. 1.8% F)': { P: 3.6, C: 4.8, F: 1.8, calories: 48, isUnit: false },
    'Milk (Skimmed - approx. 0.1% F)': { P: 3.5, C: 4.8, F: 0.1, calories: 35, isUnit: false },
    // YOGURT & SKYR (Plain, Per 100g)
    'Yogurt (Plain, Whole Milk)': { P: 3.5, C: 4.7, F: 3.5, calories: 61, isUnit: false },
    'Yogurt (Plain, Low Fat)': { P: 5.0, C: 7.0, F: 2.0, calories: 63, isUnit: false },
    'Yogurt (Plain, Non-Fat)': { P: 5.7, C: 7.0, F: 0.2, calories: 59, isUnit: false },
    'Yogurt (Greek, Plain, Whole Milk)': { P: 8.5, C: 4.0, F: 6.0, calories: 103, isUnit: false },
    'Skyr (Plain, 0% Fat)': { P: 11.0, C: 3.7, F: 0.2, calories: 61, isUnit: false }, // High protein

    // CHEESE (Per 100g)
    'Yellow Cheese (Cheddar)': { P: 24.0, C: 1.3, F: 33.1, calories: 406, isUnit: false },
    'Cottage Cheese (2% F)': { P: 10.5, C: 3.5, F: 2.0, calories: 72, isUnit: false },
    
    // --- WHOLEFOODS: MEATS & FISH (Per 100g, Cooked) ---
    'Pork Mince (Medium)': { P: 21.2, C: 0, F: 13.3, calories: 205, isUnit: false },
    'Boneless Chicken Thighs': { P: 26.0, C: 0, F: 10.0, calories: 197, isUnit: false },
    'Salmon': { P: 24.0, C: 0, F: 12.0, calories: 208, isUnit: false },
    'Hake': { P: 17.5, C: 0, F: 1.5, calories: 88, isUnit: false },
    "Beef Steak (Ribeye, Average)": { P: 24.0, C: 0, F: 22.0, calories: 291, isUnit: false },
    "Pork Cutlet (Lean Loin Chop)": { P: 25.8, C: 0, F: 13.9, calories: 231, isUnit: false }, // Cooked, Lean Loin
    "Pork Neck Steak": { P: 18.3, C: 0, F: 13.8, calories: 197, isUnit: false }, // Cooked, Collar/Neck cut

    // --- WHOLEFOODS: FATS & OILS (Per 100g) ---
    'Olive Oil': { P: 0, C: 0, F: 100, calories: 884, isUnit: false },
    'Butter': { P: 0.8, C: 0, F: 81.1, calories: 717, isUnit: false },
    'Almonds': { P: 21.2, C: 21.6, F: 49.9, calories: 579, isUnit: false }, // Raw
    'Peanuts': { P: 25.8, C: 16.1, F: 49.2, calories: 567, isUnit: false }, // Raw

    // --- WHOLEFOODS: GRAINS & STARCHES (Per 100g) ---
    'Wholegrain Bread': { P: 12.0, C: 43.0, F: 4.0, calories: 252, isUnit: false },
    'Rice': { P: 2.7, C: 28.2, F: 0.3, calories: 130, isUnit: false }, // Cooked, white, long-grain
    'Potatoes': { P: 2.5, C: 17.0, F: 0.1, calories: 77, isUnit: false }, // Cooked, boiled/baked
    'Oats': { P: 13.5, C: 68.0, F: 6.9, calories: 389, isUnit: false }, // Dry, uncooked
    
    // --- WHOLEFOODS: LEGUMES (Per 100g, Cooked) ---
    'Beans (Kidney)': { P: 8.7, C: 22.8, F: 0.5, calories: 127, isUnit: false },
    'Lentils': { P: 9.0, C: 20.0, F: 0.4, calories: 116, isUnit: false },
    'Chickpeas': { P: 8.9, C: 27.4, F: 2.9, calories: 164, isUnit: false },
    
    // --- WHOLEFOODS: FRUITS & VEGETABLES (Per 100g, Raw) ---
    'Apple': { P: 0.3, C: 13.8, F: 0.2, calories: 52, isUnit: false },
    'Banana': { P: 1.1, C: 22.8, F: 0.3, calories: 89, isUnit: false },
    'Broccoli (Cooked)': { P: 2.3, C: 4.0, F: 0.3, calories: 22, isUnit: false },
    'Spinach': { P: 2.9, C: 3.6, F: 0.4, calories: 23, isUnit: false },
    'Tomato': { P: 0.9, C: 3.9, F: 0.2, calories: 18, isUnit: false },

    // --- CONDIMENTS (Per 100g) ---
    'Mayonnaise (Regular)': { P: 0.9, C: 0.6, F: 75.0, calories: 680, isUnit: false }, 
    'Ketchup (Regular)': { P: 1.0, C: 27.0, F: 0.1, calories: 110, isUnit: false }, 

    // --- MISC / TAKEAWAY FOODS (Serving/Unit Based) ---
    "Doner Kebab Meat (Small, 85g)": { P: 20.0, C: 0, F: 26.7, calories: 320, isUnit: true },
    "Doner Kebab Meat (Medium, 100g)": { P: 23.5, C: 0, F: 31.4, calories: 377, isUnit: true },
    "Doner Kebab Meat (Large, 130g)": { P: 30.5, C: 0, F: 40.8, calories: 490, isUnit: true },
    "Pizza Slice (Standard Pepperoni)": { P: 12.0, C: 35.0, F: 14.0, calories: 310, isUnit: true }, // Est. for 1 average large slice (approx 120-140g)
    "Banitsa (with Feta/Sirene)": { P: 13.3, C: 36.4, F: 24.7, calories: 421, isUnit: false }, // Per 100g, average bakery value
    "Whey Protein Scoop (30g)": { P: 21.0, C: 4.5, F: 0.7, calories: 120, isUnit: true },
    "Whey Protein Scoop (Custom)": { P: 70, C: 15, F: 2.2, calories: 377, isUnit: false },
};


// --- GLOBAL IN-MEMORY STATE (Initialized once) ---
let logEntries = [];
let stores = []; 
let prices = {}; 
let macros = DEFAULT_MACROS;
let currentView = 'daily'; 
let exportFormat = 'csv';
let currentFoodFilter = 'all'; // 'all', 'protein', 'carbs', 'fats'

// Tailwind config (kept in JS so it can be read by the CDN runtime if included before this script)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-dark': '#1a1a2e',
                'secondary-dark': '#16213e',
                'accent-green': '#00ffc6',
                'accent-blue': '#4c7cff',
                'text-light': '#e9e9e9',
                'danger-red': '#ff4c4c',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
}

// --- Data Persistence Functions (Local Storage) ---

/** Loads all data from localStorage into global in-memory variables. */
function loadDataFromStorage() {
    try {
        const storedLog = localStorage.getItem(LOG_KEY);
        const storedStores = localStorage.getItem(STORES_KEY);
        const storedPrices = localStorage.getItem(PRICES_KEY);

        logEntries = storedLog ? JSON.parse(storedLog) : [];
        stores = storedStores ? JSON.parse(storedStores) : [];
        prices = storedPrices ? JSON.parse(storedPrices) : {};

    } catch (error) {
        console.error('Error loading data from local storage:', error);
        // Reset to defaults if loading fails
        logEntries = [];
        stores = [];
        prices = {};
    }
}

/** Saves all current global in-memory variables to localStorage. */
function saveDataToStorage() {
    try {
        localStorage.setItem(LOG_KEY, JSON.stringify(logEntries));
        localStorage.setItem(STORES_KEY, JSON.stringify(stores));
        localStorage.setItem(PRICES_KEY, JSON.stringify(prices));
    } catch (error) {
        console.error('Error saving data to local storage:', error);
    }
}

// --- Utility Functions ---

/** Formats a date object into a readable time string. */
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** Formats a date object into a readable date string (MM/DD/YYYY). */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}

/** Generates a simple unique ID for local log entries. */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}

// --- Filter Logic Functions ---

/** Checks if a food is protein-dominant based on grams. */
function isProteinHeavy(food) {
    const { P, C, F } = food;
    // Handle edge case where P is 0 (like Olive Oil)
    if (P === 0) return false; 
    return P > C && P > F;
}

/** Checks if a food is carb-dominant based on grams. */
function isCarbHeavy(food) {
    const { P, C, F } = food;
    return C > P && C > F;
}

/** Checks if a food is fat-dominant based on grams. */
function isFatHeavy(food) {
    const { P, C, F } = food;
    return F > P && F > C;
}

// --- UI Initialization and Population ---

/**
 * Sets the global food filter and repopulates the food dropdowns.
 * Assumes 'all', 'protein', 'carbs', 'fats' are the values.
 * Also updates button styles, assuming buttons with IDs like 'filterAllBtn'.
 */
function handleSetFoodFilter(filterType) {
    currentFoodFilter = filterType;
    populateFoodSelectors(); // Re-populate dropdowns with the new filter

    // --- Assumed UI update ---
    // This part assumes you have buttons in your HTML with these IDs.
    const filterButtons = {
        all: document.getElementById('filterAllBtn'),
        protein: document.getElementById('filterProteinBtn'),
        carbs: document.getElementById('filterCarbBtn'),
        fats: document.getElementById('filterFatBtn'),
    };

    // Reset all buttons to inactive style
    Object.values(filterButtons).forEach(btn => {
        if (btn) {
            // Assumes inactive style
            btn.classList.remove('bg-accent-blue', 'text-primary-dark');
            btn.classList.add('bg-primary-dark/50', 'text-text-light');
        }
    });

    // Set the active button's style
    if (filterButtons[filterType]) {
        // Assumes active style
        filterButtons[filterType].classList.add('bg-accent-blue', 'text-primary-dark');
        filterButtons[filterType].classList.remove('bg-primary-dark/50', 'text-text-light');
    }
}


/** Populates all food selection dropdowns based on the current filter. */
function populateFoodSelectors() {
    let foodNames = Object.keys(macros);

    // Apply filter
    if (currentFoodFilter === 'protein') {
        foodNames = foodNames.filter(name => isProteinHeavy(macros[name]));
    } else if (currentFoodFilter === 'carbs') {
        foodNames = foodNames.filter(name => isCarbHeavy(macros[name]));
    } else if (currentFoodFilter === 'fats') {
        foodNames = foodNames.filter(name => isFatHeavy(macros[name]));
    }
    // 'all' case needs no filtering

    const entryFoodSelect = document.getElementById('entryFoodSelect');
    const priceFoodSelect = document.getElementById('priceFoodSelect');

    // Clear and re-add default option
    entryFoodSelect.innerHTML = '<option value="">-- Select Food --</option>';
    priceFoodSelect.innerHTML = '<option value="">-- Select Food --</option>';

    foodNames.forEach(food => {
        const option1 = document.createElement('option');
        option1.value = food;
        option1.textContent = food;
        entryFoodSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = food;
        option2.textContent = food;
        priceFoodSelect.appendChild(option2);
    });
}

/** Populates all store selection dropdowns. */
function populateStoreSelectors() {
    const entryStoreSelect = document.getElementById('entryStoreSelect');
    const priceStoreSelect = document.getElementById('priceStoreSelect');

    // Clear and re-add default option for entry
    entryStoreSelect.innerHTML = '<option value="">-- Manual Cost --</option>';
    // Clear and re-add default option for pricing
    priceStoreSelect.innerHTML = '<option value="">-- Select Store --</option>';

    stores.forEach(store => {
        const option1 = document.createElement('option');
        option1.value = store;
        option1.textContent = store;
        entryStoreSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = store;
        option2.textContent = store;
        priceStoreSelect.appendChild(option2);
    });
}

// --- Store and Price Management ---

/** Adds a new store to the in-memory array and updates storage. */
function handleAddStore() {
    const input = document.getElementById('newStoreName');
    const storeName = input.value.trim();

    if (storeName && !stores.includes(storeName)) {
        stores.push(storeName);
        saveDataToStorage();
        populateStoreSelectors();
        renderStoreList();
        input.value = '';
        input.placeholder = `Store '${storeName}' added!`;
        setTimeout(() => input.placeholder = 'e.g., Global Grocer', 2000);
    } else if (stores.includes(storeName)) {
        input.value = '';
        input.placeholder = `Store '${storeName}' already exists!`;
        setTimeout(() => input.placeholder = 'e.g., Global Grocer', 2000);
    }
}

/** Renders the list of stores with delete buttons in the Stores page. */
function renderStoreList() {
    const container = document.getElementById('storesList');
    if (!container) return;
    container.innerHTML = '';

    if (!stores || stores.length === 0) {
        container.innerHTML = '<div class="py-2 text-sm opacity-70">No stores added yet.</div>';
        return;
    }

    stores.forEach(store => {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between p-2 bg-primary-dark rounded-lg border border-secondary-dark';

        const name = document.createElement('div');
        name.className = 'font-medium text-text-light';
        name.textContent = store;

        const actions = document.createElement('div');
        actions.className = 'flex items-center space-x-2';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'bg-danger-red text-xs hover:bg-opacity-80 transition px-2 py-1 rounded text-text-light';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => handleDeleteStore(store));

        actions.appendChild(deleteBtn);
        row.appendChild(name);
        row.appendChild(actions);
        container.appendChild(row);
    });
}

/** Deletes a store and its prices, updates storage and UI. */
function handleDeleteStore(storeName) {
    // Replaced confirm() with a simple return for non-interactive environments
    // In a real app, you'd want a custom modal here.
    // if (!confirm(`Delete store '${storeName}' and its prices? This cannot be undone.`)) return;

    console.warn(`Attempting to delete store: ${storeName}. Bypassing confirm() dialog.`);

    // Remove from stores array
    stores = stores.filter(s => s !== storeName);

    // Remove prices for that store
    if (prices && prices[storeName]) delete prices[storeName];

    // Update any existing log entries that referenced this store to 'Manual/Other'
    logEntries = logEntries.map(entry => (entry.store === storeName) ? { ...entry, store: 'Manual/Other' } : entry);

    saveDataToStorage();
    populateStoreSelectors();
    renderStoreList();
}

/** Exports stores and prices as a JSON file for download. */
function exportStoresJSON() {
    const payload = {
        stores: stores || [],
        prices: prices || {}
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
    a.href = url;
    a.download = `macrofuel_stores_${now}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/** Handles importing stores/prices from a selected JSON file. */
function handleImportStoresFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data) throw new Error('Invalid JSON');

            // Merge stores
            if (Array.isArray(data.stores)) {
                data.stores.forEach(s => { if (!stores.includes(s)) stores.push(s); });
            }

            // Merge prices (overwrite per-store food prices)
            if (data.prices && typeof data.prices === 'object') {
                Object.keys(data.prices).forEach(storeKey => {
                    if (!prices[storeKey]) prices[storeKey] = {};
                    const storePrices = data.prices[storeKey];
                    if (storePrices && typeof storePrices === 'object') {
                        Object.keys(storePrices).forEach(foodKey => {
                            prices[storeKey][foodKey] = storePrices[foodKey];
                        });
                    }
                });
            }

            saveDataToStorage();
            populateStoreSelectors();
            renderStoreList();

            // Replaced alert() with console.log
            console.log('Stores and prices imported successfully.');
        } catch (err) {
            console.error('Import error:', err);
            // Replaced alert() with console.error
            console.error('Failed to import JSON: ' + (err.message || err));
        }
    };
    reader.readAsText(file);
}

/** Updates the label for price input based on food selection and loads in-memory price. */
function updatePriceInputLabel() {
    const food = document.getElementById('priceFoodSelect').value;
    const gramsInput = document.getElementById('priceGramsInput');
    const gramsLabel = document.getElementById('gramsLabel');
    
    if (food && macros[food]?.isUnit) {
        gramsLabel.textContent = 'Amount (Unit)';
        gramsInput.value = 1;
        gramsInput.disabled = true;
    } else {
        gramsLabel.textContent = 'Amount (g)';
        gramsInput.value = '';
        gramsInput.disabled = false;
    }

    // Load existing price from in-memory 'prices' object
    const store = document.getElementById('priceStoreSelect').value;
    if (store && food && prices[store] && prices[store][food]) {
        const existing = prices[store][food];
        gramsInput.value = existing.grams;
        document.getElementById('priceCostInput').value = existing.price;
    } else {
        if (!gramsInput.disabled) {
            gramsInput.value = '';
        }
        document.getElementById('priceCostInput').value = '';
    }
}

/** Saves the price of a food item for a selected store and updates storage. */
function handleSavePrice() {
    const store = document.getElementById('priceStoreSelect').value;
    const food = document.getElementById('priceFoodSelect').value;
    let grams = parseFloat(document.getElementById('priceGramsInput').value); 
    const price = parseFloat(document.getElementById('priceCostInput').value);

    // If it's a unit-based food (like Eggs), force grams to 1 if it's invalid/empty.
    if (food && macros[food]?.isUnit && (isNaN(grams) || grams <= 0)) {
        grams = 1;
    }
    
    if (!store || !food || isNaN(grams) || isNaN(price) || grams <= 0 || price <= 0) {
        console.error("Invalid input for price setting.");
        document.getElementById('savePriceBtn').textContent = "Invalid Input!";
        setTimeout(() => document.getElementById('savePriceBtn').textContent = "Save Price", 2000);
        return;
    }

    if (!prices[store]) {
        prices[store] = {};
    }

    // Save to in-memory store
    prices[store][food] = {
        grams: grams,
        price: price
    };
    
    saveDataToStorage();

    document.getElementById('savePriceBtn').textContent = "Price Saved!";
    setTimeout(() => document.getElementById('savePriceBtn').textContent = "Save Price", 2000);
}

// --- Entry Calculation Logic ---

/** Calculates macros and cost based on current entry form inputs. */
function calculateEntry() {
    const food = document.getElementById('entryFoodSelect').value;
    const amount = parseFloat(document.getElementById('entryAmountInput').value);
    const store = document.getElementById('entryStoreSelect').value;
    const costInput = document.getElementById('entryCostInput');

    let calculatedP = 0, calculatedC = 0, calculatedF = 0, calculatedCost = 0, calculatedCalories = 0;
    const isManualCost = !store;

    // 1. Calculate Macros
    if (food && !isNaN(amount) && amount > 0 && macros[food]) {
        const foodMacros = macros[food];
        const multiplier = amount / (foodMacros.isUnit ? 1 : 100);
        calculatedP = (foodMacros.P * multiplier);
        calculatedC = (foodMacros.C * multiplier);
        calculatedF = (foodMacros.F * multiplier);
        calculatedCalories = (foodMacros.calories * multiplier);
    }

    // 2. Calculate Cost (or toggle manual input)
    costInput.disabled = !isManualCost;
    costInput.placeholder = isManualCost ? 'Manual Cost Input' : 'Calculated Cost';

    if (!isManualCost) {
        if (food && store && prices[store] && prices[store][food] && !isNaN(amount) && amount > 0) {
            const priceData = prices[store][food];
            calculatedCost = (amount / priceData.grams) * priceData.price;
            costInput.value = calculatedCost.toFixed(2);
        } else {
            costInput.value = '';
        }
        calculatedCost = parseFloat(costInput.value) || 0;
    } else {
        calculatedCost = parseFloat(costInput.value) || 0;
    }

    // 3. Update display
    document.getElementById('calcProtein').textContent = calculatedP.toFixed(1);
    document.getElementById('calcCarbs').textContent = calculatedC.toFixed(1);
    document.getElementById('calcFats').textContent = calculatedF.toFixed(1);
    document.getElementById('calcCalories').textContent = calculatedCalories.toFixed(1);
    document.getElementById('calcCost').textContent = calculatedCost.toFixed(2);

    return { calculatedP, calculatedC, calculatedF, calculatedCost, calculatedCalories };
}

/** Handles changing the input label for grams/units. */
function updateEntryInputLabel() {
    const food = document.getElementById('entryFoodSelect').value;
    const label = document.getElementById('entryAmountLabel');
    if (food && macros[food]?.isUnit) {
        label.textContent = 'Amount (Units)';
    } else {
        label.textContent = 'Amount (grams)';
    }
    calculateEntry(); 
}

// --- Log Handlers (Local Storage Interactions) ---

/** Adds a new entry to the in-memory array and updates storage. */
function handleAddEntry() {
    const food = document.getElementById('entryFoodSelect').value;
    const amount = parseFloat(document.getElementById('entryAmountInput').value);
    const store = document.getElementById('entryStoreSelect').value;
    const cost = parseFloat(document.getElementById('entryCostInput').value);
    
    if (!food || isNaN(amount) || amount <= 0 || isNaN(cost) || cost < 0) {
        document.getElementById('addEntryBtn').textContent = "Invalid Entry! Check inputs.";
        setTimeout(() => document.getElementById('addEntryBtn').textContent = "Log Entry", 2000);
        return;
    }
    
    const { calculatedP, calculatedC, calculatedF, calculatedCalories } = calculateEntry();

    const newEntry = {
        id: generateId(), // Local unique ID
        food: food,
        amount: amount,
        unit: macros[food].isUnit ? 'Units' : 'grams',
        protein: calculatedP,
        carbs: calculatedC,
        fats: calculatedF,
        calories: calculatedCalories,
        cost: cost,
        store: store || 'Manual/Other',
        created_at: new Date().toISOString() // Use created_at for sorting/filtering
    };

    logEntries.unshift(newEntry); // Add to beginning for newest first
    saveDataToStorage();

    // Clear form and re-render
    document.getElementById('entryAmountInput').value = '';
    document.getElementById('entryStoreSelect').value = '';
    document.getElementById('entryCostInput').value = '';
    calculateEntry();
    document.getElementById('addEntryBtn').textContent = "Entry Logged!";
    setTimeout(() => document.getElementById('addEntryBtn').textContent = "Log Entry", 2000);
    
    if (currentView === 'daily') {
        renderLog();
    } else {
        renderTotalHistory();
    }
}

/** Removes an entry from the in-memory array by ID and updates storage. */
function handleRemoveEntry(id) {
    // Filter the array to remove the entry with the matching ID
    logEntries = logEntries.filter(entry => entry.id !== id);
    saveDataToStorage();
    
    if (currentView === 'daily') {
        renderLog();
    } else {
        renderTotalHistory();
    }
}
        
/** Renders the current day's log entries to the table and updates totals. */
function renderLog() {
    if (currentView !== 'daily') return;
    
    const tableBody = document.getElementById('logTableBody');
    if (!tableBody) return; // Exit if element not found
    
    const today = formatDate(new Date().toISOString());
    let dailyTotalP = 0, dailyTotalC = 0, dailyTotalF = 0, dailyTotalCost = 0, dailyTotalCalories = 0;
    
    tableBody.innerHTML = '';

    const todayEntries = logEntries.filter(entry => formatDate(entry.created_at) === today);

    if (todayEntries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="py-4 text-center opacity-70">No entries logged today. Get moving!</td></tr>`;
    }

    todayEntries.forEach(entry => {
        const row = tableBody.insertRow();
        row.classList.add('border-b', 'border-secondary-dark', 'hover:bg-primary-dark');
        row.innerHTML = `
            <td class="px-3 py-3 font-medium text-text-light">${entry.food} <span class="text-xs opacity-60">(${entry.amount}${entry.unit})</span></td>
            <td class="px-3 py-3 text-center">${entry.protein.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">${entry.carbs.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">${entry.fats.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">${entry.calories.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">$${entry.cost.toFixed(2)}</td>
            <td class="px-3 py-3 text-center text-xs opacity-80">${formatTime(entry.created_at)}</td>
            <td class="px-3 py-3 text-center">
                <button onclick="handleRemoveEntry('${entry.id}')" class="bg-danger-red text-xs hover:bg-opacity-80 transition px-2 py-1 rounded-full text-text-light font-medium">Remove</button>
            </td>
        `;
        dailyTotalP += entry.protein;
        dailyTotalC += entry.carbs;
        dailyTotalF += entry.fats;
        dailyTotalCost += entry.cost;
        dailyTotalCalories += entry.calories;
    });

    // Update Totals Display
    document.getElementById('totalProtein').textContent = dailyTotalP.toFixed(1);
    document.getElementById('totalCarbs').textContent = dailyTotalC.toFixed(1);
    document.getElementById('totalFats').textContent = dailyTotalF.toFixed(1);
    document.getElementById('totalCalories').textContent = dailyTotalCalories.toFixed(1);
    document.getElementById('totalCost').textContent = dailyTotalCost.toFixed(2);
}

/** Renders all log entries in the history table. */
function renderTotalHistory() {
    if (currentView !== 'history') return;

    const tableBody = document.getElementById('historyTableBody');
    if (!tableBody) return; // Exit if element not found
    tableBody.innerHTML = '';

    let totalTotalP = 0, totalTotalC = 0, totalTotalF = 0, totalTotalCost = 0, totalTotalCalories = 0;

    if (logEntries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="py-4 text-center opacity-70">No history entries found. Start logging!</td></tr>`;
        document.getElementById('historyTotalProtein').textContent = '0';
        document.getElementById('historyTotalCarbs').textContent = '0';
        document.getElementById('historyTotalFats').textContent = '0';
        document.getElementById('historyTotalCalories').textContent = '0';
        document.getElementById('historyTotalCost').textContent = '0.00';
        return;
    }

    // Entries are already sorted (newest first)
    logEntries.forEach(entry => {
        const row = tableBody.insertRow();
        row.classList.add('border-b', 'border-secondary-dark', 'hover:bg-primary-dark');
        row.innerHTML = `
            <td class="px-3 py-3 text-xs opacity-70">${formatDate(entry.created_at)}<br/>${formatTime(entry.created_at)}</td>
            <td class="px-3 py-3 font-medium text-text-light">${entry.food} <span class="text-xs opacity-60">(${entry.amount}${entry.unit})</span></td>
            <td class="px-3 py-3 text-center">${entry.protein.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">${entry.carbs.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">${entry.fats.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">${entry.calories.toFixed(1)}</td>
            <td class="px-3 py-3 text-center">$${entry.cost.toFixed(2)}</td>
            <td class="px-3 py-3 text-center">
                <button onclick="handleRemoveEntry('${entry.id}')" class="bg-danger-red text-xs hover:bg-opacity-80 transition px-2 py-1 rounded-full text-text-light font-medium">Remove</button>
            </td>
        `;
        totalTotalP += entry.protein;
        totalTotalC += entry.carbs;
        totalTotalF += entry.fats;
        totalTotalCost += entry.cost;
        totalTotalCalories += entry.calories;
    });

    // Update Totals Display for History
    document.getElementById('historyTotalProtein').textContent = totalTotalP.toFixed(1);
    document.getElementById('historyTotalCarbs').textContent = totalTotalC.toFixed(1);
    document.getElementById('historyTotalFats').textContent = totalTotalF.toFixed(1);
    document.getElementById('historyTotalCalories').textContent = totalTotalCalories.toFixed(1);
    document.getElementById('historyTotalCost').textContent = totalTotalCost.toFixed(2);
}

/** Switches the current view between 'daily' and 'history'. */
function switchView(viewName) {
    currentView = viewName;
    const dailyView = document.getElementById('dailyView');
    const historyView = document.getElementById('historyView');
    const title = document.getElementById('logTitle');
    const dailyBtn = document.getElementById('toggleDailyBtn');
    const historyBtn = document.getElementById('toggleHistoryBtn');

    if (viewName === 'daily') {
        dailyView.classList.remove('hidden');
        historyView.classList.add('hidden');
        title.textContent = "Today's Log";
        dailyBtn.classList.add('bg-accent-green', 'text-primary-dark');
        dailyBtn.classList.remove('bg-primary-dark/50', 'text-text-light');
        historyBtn.classList.add('bg-primary-dark/50', 'text-text-light');
        historyBtn.classList.remove('bg-accent-green', 'text-primary-dark');
        renderLog();
    } else {
        dailyView.classList.add('hidden');
        historyView.classList.remove('hidden');
        title.textContent = "Total History Log";
        dailyBtn.classList.add('bg-primary-dark/50', 'text-text-light');
        dailyBtn.classList.remove('bg-accent-green', 'text-primary-dark');
        
        historyBtn.classList.add('bg-accent-green', 'text-primary-dark');
        historyBtn.classList.remove('bg-primary-dark/50', 'text-text-light');
        
        renderTotalHistory();
    }
}

/** Switches the left-column page between entry, stores, and data pages. */
function switchLeftPage(pageName) {
    const pages = {
        entry: document.getElementById('pageEntry'),
        stores: document.getElementById('pageStores'),
        data: document.getElementById('pageData')
    };

    const btns = {
        entry: document.getElementById('navEntryBtn'),
        stores: document.getElementById('navStoresBtn'),
        data: document.getElementById('navDataBtn')
    };

    // Hide all pages and reset buttons
    Object.values(pages).forEach(p => { if (p) p.classList.add('hidden'); });
    Object.values(btns).forEach(b => { if (b) { b.classList.remove('bg-accent-green'); b.classList.remove('text-primary-dark'); b.classList.add('bg-primary-dark/50'); b.classList.add('text-text-light'); } });

    // Show selected
    if (pages[pageName]) pages[pageName].classList.remove('hidden');
    if (btns[pageName]) { btns[pageName].classList.remove('bg-primary-dark/50'); btns[pageName].classList.remove('text-text-light'); btns[pageName].classList.add('bg-accent-green'); btns[pageName].classList.add('text-primary-dark'); }
}

/** Toggles the visibility of a content section for mobile view. */
function toggleSection(contentId) {
    const content = document.getElementById(contentId);
    const icon = document.getElementById(contentId.replace('Content', 'Icon'));
    
    if (!content || !icon) return; // Guard clause
    
    const isHidden = content.classList.contains('hidden');

    if (isHidden) {
        content.classList.remove('hidden');
        content.classList.add('block');
        icon.classList.remove('rotate-0');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        content.classList.remove('block');
        icon.classList.remove('rotate-180');
        icon.classList.add('rotate-0');
    }
}


/** Shows the confirmation modal for resetting history. */
function showResetConfirmation() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

/** Hides the confirmation modal. */
function hideResetConfirmation() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

/** Clears all log history and resets the app state. */
function handleResetHistory() {
    hideResetConfirmation();
    
    // Clear all relevant keys from local storage
    localStorage.removeItem(LOG_KEY);
    localStorage.removeItem(STORES_KEY);
    localStorage.removeItem(PRICES_KEY);

    // Reset in-memory states and refresh
    logEntries = [];
    stores = [];
    prices = {}; 

    switchView('daily');
    populateStoreSelectors();
    renderLog();
    renderStoreList(); // Also re-render the empty store list

    const resetText = document.getElementById('resetText');
    if (resetText) {
        resetText.textContent = "History Cleared!";
        setTimeout(() => resetText.textContent = "Reset All History (DANGER)", 3000);
    }
}

// --- Export Logic (SheetJS) ---

/** Generates a CSV file from data. */
function exportToCSV(data, fileName) {
    if (data.length === 0) {
        console.error("No data to export.");
        return;
    }

    const header = ["Date", "Food", "Amount", "Unit", "Store", "Protein (g)", "Carbs (g)", "Fats (g)", "Calories", "Cost ($)"];
    const rows = data.map(entry => [
        `"${formatDate(entry.created_at)} ${formatTime(entry.created_at)}"`,
        `"${entry.food}"`,
        entry.amount,
        `"${entry.unit}"`,
        `"${entry.store}"`,
        entry.protein.toFixed(1),
        entry.carbs.toFixed(1),
        entry.fats.toFixed(1),
        entry.calories.toFixed(1),
        entry.cost.toFixed(2)
    ].join(','));

    const totals = data.reduce((acc, entry) => {
        acc.protein += entry.protein;
        acc.carbs += entry.carbs;
        acc.fats += entry.fats;
        acc.calories += entry.calories;
        acc.cost += entry.cost;
        return acc;
    }, { protein: 0, carbs: 0, fats: 0, calories: 0, cost: 0 });

    const totalsRow = ["TOTALS", "", "", "", "", totals.protein.toFixed(1), totals.carbs.toFixed(1), totals.fats.toFixed(1), totals.calories.toFixed(1), totals.cost.toFixed(2)].join(',');

    const csvContent = [header.join(','), ...rows, totalsRow].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/** Generates an XLSX file from data. */
function exportToXLSX(data, fileName) {
    if (typeof XLSX === 'undefined') {
        console.error("SheetJS (XLSX) library is not loaded.");
        return;
    }
    if (data.length === 0) {
        console.error("No data to export.");
        return;
    }
    
    // 1. Prepare data rows
    const header = ["Date", "Food", "Amount", "Unit", "Store", "Protein (g)", "Carbs (g)", "Fats (g)", "Calories", "Cost ($)"];
    const rows = data.map(entry => [
        formatDate(entry.created_at) + ' ' + formatTime(entry.created_at),
        entry.food,
        entry.amount,
        entry.unit,
        entry.store,
        parseFloat(entry.protein.toFixed(1)),
        parseFloat(entry.carbs.toFixed(1)),
        parseFloat(entry.fats.toFixed(1)),
        parseFloat(entry.calories.toFixed(1)),
        parseFloat(entry.cost.toFixed(2))
    ]);

    // 2. Calculate Totals Row
    const totals = data.reduce((acc, entry) => {
        acc.protein += entry.protein;
        acc.carbs += entry.carbs;
        acc.fats += entry.fats;
        acc.calories += entry.calories;
        acc.cost += entry.cost;
        return acc;
    }, { protein: 0, carbs: 0, fats: 0, calories: 0, cost: 0 });

    const totalsRow = [
        "TOTALS", "", "", "", "", 
        parseFloat(totals.protein.toFixed(1)), 
        parseFloat(totals.carbs.toFixed(1)), 
        parseFloat(totals.fats.toFixed(1)), 
        parseFloat(totals.calories.toFixed(1)), 
        parseFloat(totals.cost.toFixed(2))
    ];
    
    // 3. Create Workbook
    const worksheetData = [header, ...rows, totalsRow];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MacroLog");
    
    // 4. Write and download
    XLSX.writeFile(wb, fileName);
}

/** Exports only today's log entries. */
function handleExportDaily() {
    const today = formatDate(new Date().toISOString());
    const dailyData = logEntries.filter(entry => formatDate(entry.created_at) === today);
    const fileExtension = exportFormat;
    const fileName = `MacroLog_Daily_${today.replace(/\//g, '-')}.${fileExtension}`;
    if (exportFormat === 'csv') {
        exportToCSV(dailyData, fileName);
    } else {
        exportToXLSX(dailyData, fileName);
    }
}

/** Exports all log entries from history. */
function handleExportTotal() {
    const fileExtension = exportFormat;
    const fileName = `MacroLog_TotalHistory.${fileExtension}`;
    if (exportFormat === 'csv') {
        exportToCSV(logEntries, fileName);
    } else {
        exportToXLSX(logEntries, fileName);
    }
}

function handleImport(file) {
    if (!file) return;
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
        handleImportCSVFile(file);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        handleImportXLSXFile(file);
    } else {
        // Replaced alert() with console.error
        console.error('Unsupported file type. Please select a .csv or .xlsx file.');
    }
}

/** Handles importing a CSV file and merging entries into logEntries. */
function handleImportCSVFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            const lines = text.split('\n');

            if (lines.length <= 1) {
                console.warn('No data found in the CSV file.');
                return;
            }

            const imported = [];

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                // Stop at a TOTal/SUM row if present
                if (line.toUpperCase().startsWith('TOTALS')) break;

                const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));

                let created_at = new Date(values[0]);
                if (isNaN(created_at.getTime())) {
                    const parsed = Date.parse(values[0]);
                    created_at = isNaN(parsed) ? new Date() : new Date(parsed);
                }

                const food = values[1] || '';
                const amount = parseFloat(values[2]) || 0;
                const unit = values[3] || (macros[food]?.isUnit ? 'Units' : 'grams');
                const store = values[4] || 'Manual/Other';
                const protein = parseFloat(values[5]) || 0;
                const carbs = parseFloat(values[6]) || 0;
                const fats = parseFloat(values[7]) || 0;
                const calories = parseFloat(values[8]) || 0;
                const cost = parseFloat(values[9]) || 0;

                const entry = {
                    id: generateId(),
                    food: food,
                    amount: amount,
                    unit: unit,
                    protein: protein,
                    carbs: carbs,
                    fats: fats,
                    calories: calories,
                    cost: cost,
                    store: store,
                    created_at: created_at.toISOString()
                };

                imported.push(entry);
            }

            if (imported.length === 0) {
                console.warn('No entries were imported from the CSV file.');
                return;
            }

            for (let j = imported.length - 1; j >= 0; j--) {
                logEntries.unshift(imported[j]);
            }

            saveDataToStorage();
            if (currentView === 'daily') renderLog(); else renderTotalHistory();

            console.log(`Imported ${imported.length} entries successfully.`);
        } catch (err) {
            console.error('CSV import error:', err);
            console.error('Failed to import CSV: ' + (err.message || err));
        }
    };
    reader.readAsText(file);
}

/** Handles importing an XLSX file and merging entries into logEntries. */
function handleImportXLSXFile(file) {
    if (!file) return;
    if (typeof XLSX === 'undefined') {
        console.error("SheetJS (XLSX) library is not loaded. Cannot import.");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (!rows || rows.length <= 1) {
                console.warn('No data found in the XLSX file.');
                return;
            }

            const imported = [];

            for (let i = 1; i < rows.length; i++) {
                const r = rows[i];
                if (!r || r.length === 0) continue;

                if (/^TOTALS?$/i.test((r[0] || '').toString().trim())) break;

                let created_at = new Date(r[0] ? r[0].toString().trim() : '');
                if (isNaN(created_at.getTime())) {
                    const parsed = Date.parse(r[0] ? r[0].toString().trim() : '');
                    created_at = isNaN(parsed) ? new Date() : new Date(parsed);
                }

                const food = r[1] ? r[1].toString().trim() : '';
                const amount = parseFloat(r[2]) || 0;
                const unit = r[3] ? r[3].toString().trim() : (macros[food]?.isUnit ? 'Units' : 'grams');
                const store = r[4] ? r[4].toString().trim() : 'Manual/Other';
                const protein = parseFloat(r[5]) || 0;
                const carbs = parseFloat(r[6]) || 0;
                const fats = parseFloat(r[7]) || 0;
                const calories = parseFloat(r[8]) || 0;
                const cost = parseFloat(r[9]) || 0;

                const entry = {
                    id: generateId(),
                    food: food,
                    amount: amount,
                    unit: unit,
                    protein: protein,
                    carbs: carbs,
                    fats: fats,
                    calories: calories,
                    cost: cost,
                    store: store,
                    created_at: created_at.toISOString()
                };

                imported.push(entry);
            }

            if (imported.length === 0) {
                console.warn('No entries were imported from the XLSX file.');
                return;
            }

            for (let j = imported.length - 1; j >= 0; j--) {
                logEntries.unshift(imported[j]);
            }

            saveDataToStorage();
            if (currentView === 'daily') renderLog(); else renderTotalHistory();

            console.log(`Imported ${imported.length} entries successfully.`);
        } catch (err) {
            console.error('XLSX import error:', err);
            console.error('Failed to import XLSX: ' + (err.message || err));
        }
    };
    reader.readAsArrayBuffer(file);
}


// --- Event Listeners and Initialization ---

window.onload = function() {
    loadDataFromStorage(); 
    
    // Note: populateFoodSelectors() is called by handleSetFoodFilter('all')
    populateStoreSelectors();
    switchView('daily'); 

    // Initialize left-column page (entry by default)
    if (document.getElementById('navEntryBtn')) {
        document.getElementById('navEntryBtn').addEventListener('click', () => switchLeftPage('entry'));
    }
    if (document.getElementById('navStoresBtn')) {
        document.getElementById('navStoresBtn').addEventListener('click', () => switchLeftPage('stores'));
    }
    if (document.getElementById('navDataBtn')) {
        document.getElementById('navDataBtn').addEventListener('click', () => switchLeftPage('data'));
    }
    // Show default left page
    switchLeftPage('entry');

    // Wire store export/import and render current stores list
    const exportStoresBtn = document.getElementById('exportStoresBtn');
    const importStoresBtn = document.getElementById('importStoresBtn');
    const importStoresFile = document.getElementById('importStoresFile');
    if (exportStoresBtn) exportStoresBtn.addEventListener('click', exportStoresJSON);
    if (importStoresBtn && importStoresFile) importStoresBtn.addEventListener('click', () => importStoresFile.click());
    if (importStoresFile) importStoresFile.addEventListener('change', (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) handleImportStoresFile(f);
        importStoresFile.value = '';
    });

    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => importFile.click());
        importFile.addEventListener('change', (e) => {
            const f = e.target.files && e.target.files[0];
            if (f) {
                handleImport(f);
            }
            importFile.value = '';
        });
    }

    renderStoreList();

    // Store Management Listeners
    if (document.getElementById('addStoreBtn')) {
        document.getElementById('addStoreBtn').addEventListener('click', handleAddStore);
    }
    
    // Pricing Form Listeners
    if (document.getElementById('priceFoodSelect')) {
        document.getElementById('priceFoodSelect').addEventListener('change', updatePriceInputLabel);
    }
    if (document.getElementById('priceStoreSelect')) {
        document.getElementById('priceStoreSelect').addEventListener('change', updatePriceInputLabel);
    }
    if (document.getElementById('savePriceBtn')) {
        document.getElementById('savePriceBtn').addEventListener('click', handleSavePrice);
    }

    // Entry Form Listeners (Real-time calculation)
    const entryFormElements = ['entryFoodSelect', 'entryAmountInput', 'entryStoreSelect', 'entryCostInput'];
    entryFormElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', id === 'entryFoodSelect' ? updateEntryInputLabel : calculateEntry);
        }
    });

    if (document.getElementById('addEntryBtn')) {
        document.getElementById('addEntryBtn').addEventListener('click', handleAddEntry);
    }

    // View Toggles
    if (document.getElementById('toggleDailyBtn')) {
        document.getElementById('toggleDailyBtn').addEventListener('click', () => switchView('daily'));
    }
    if (document.getElementById('toggleHistoryBtn')) {
        document.getElementById('toggleHistoryBtn').addEventListener('click', () => switchView('history'));
    }

    // Data Management Listeners
    if (document.getElementById('exportDailyBtn')) {
        document.getElementById('exportDailyBtn').addEventListener('click', handleExportDaily);
    }
    if (document.getElementById('exportTotalBtn')) {
        document.getElementById('exportTotalBtn').addEventListener('click', handleExportTotal);
    }
    if (document.getElementById('resetHistoryBtn')) {
        document.getElementById('resetHistoryBtn').addEventListener('click', showResetConfirmation);
    }
    
    // Modal Listeners
    if (document.getElementById('confirmResetBtn')) {
        document.getElementById('confirmResetBtn').addEventListener('click', handleResetHistory);
    }
    if (document.getElementById('cancelResetBtn')) {
        document.getElementById('cancelResetBtn').addEventListener('click', hideResetConfirmation);
    }

    if (document.getElementById('exportFormatToggle')) {
        document.getElementById('exportFormatToggle').addEventListener('change', (e) => {
            exportFormat = e.target.checked ? 'xlsx' : 'csv';
        });
    }

    // --- Food Filter Listeners (Assumed IDs) ---
    // This assumes you have buttons in your HTML with these IDs.
    const filterAllBtn = document.getElementById('filterAllBtn');
    const filterProteinBtn = document.getElementById('filterProteinBtn');
    const filterCarbBtn = document.getElementById('filterCarbBtn');
    const filterFatBtn = document.getElementById('filterFatBtn');

    if (filterAllBtn) filterAllBtn.addEventListener('click', () => handleSetFoodFilter('all'));
    if (filterProteinBtn) filterProteinBtn.addEventListener('click', () => handleSetFoodFilter('protein'));
    if (filterCarbBtn) filterCarbBtn.addEventListener('click', () => handleSetFoodFilter('carbs'));
    if (filterFatBtn) filterFatBtn.addEventListener('click', () => handleSetFoodFilter('fats'));

    // Set initial filter state and populate dropdowns
    handleSetFoodFilter('all'); 
};
