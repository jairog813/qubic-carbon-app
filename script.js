function loadItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const lists = {
        'ticket': document.getElementById('ticket-list'),
        'gas-card': document.getElementById('gas-card-list'),
        'utility': document.getElementById('utility-list'),
        'carbon-credit': document.getElementById('carbon-credit-list')
    };
    Object.values(lists).forEach(list => list.innerHTML = '');
    
    let totalCost = 0;
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.type.toUpperCase()}: ${item.details} <button>Delete</button>`;
        li.dataset.index = index;
        lists[item.type].appendChild(li);
        
        const costMatch = item.details.match(/\$(\d+)/);
        if (costMatch) totalCost += parseInt(costMatch[1]);
    });
    
    document.getElementById('total-cost').textContent = `Total Cost: $${totalCost}`;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message';
    messageDiv.classList.add(type === 'success' ? 'message-success' : 'message-error');
    setTimeout(() => {
        messageDiv.classList.remove('message-success', 'message-error');
        messageDiv.textContent = '';
    }, 3000);
}

document.getElementById('item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const itemType = document.getElementById('item-type').value;
    const itemDetails = document.getElementById('item-details').value;
    
    // Validate item details format (must include a cost like $500)
    const costMatch = itemDetails.match(/\$(\d+)/);
    if (!costMatch) {
        showMessage('Please include a cost in the format "$500" (e.g., "Flight to Tokyo, $500").', 'error');
        return;
    }
    
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({ type: itemType, details: itemDetails });
    localStorage.setItem('items', JSON.stringify(items));
    
    loadItems();
    
    document.getElementById('item-details').value = '';
    document.getElementById('item-type').value = '';
    showMessage('Item added successfully!', 'success');
});

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.parentElement.tagName === 'LI') {
        const index = e.target.parentElement.dataset.index;
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        loadItems();
    }
});

document.getElementById('reset-cart').addEventListener('click', function() {
    localStorage.removeItem('items');
    loadItems();
    showMessage('Cart reset successfully!', 'success');
});

document.addEventListener('DOMContentLoaded', loadItems);