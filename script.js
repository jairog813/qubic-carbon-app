<<<<<<< HEAD
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

=======
>>>>>>> 5ed59ef (Initial QUBIC CARBON app commit)
document.getElementById('item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const itemType = document.getElementById('item-type').value;
    const itemDetails = document.getElementById('item-details').value;
    
<<<<<<< HEAD
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push({ type: itemType, details: itemDetails });
    localStorage.setItem('items', JSON.stringify(items));
    
    loadItems();
=======
    const li = document.createElement('li');
    li.innerHTML = `${itemType.toUpperCase()}: ${itemDetails} <button>Delete</button>`;
    
    document.getElementById('item-list').appendChild(li);
>>>>>>> 5ed59ef (Initial QUBIC CARBON app commit)
    
    document.getElementById('item-details').value = '';
    document.getElementById('item-type').value = '';
});

<<<<<<< HEAD
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.parentElement.tagName === 'LI') {
        const index = e.target.parentElement.dataset.index;
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        loadItems();
    }
});

document.addEventListener('DOMContentLoaded', loadItems);
=======
document.getElementById('item-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
});
>>>>>>> 5ed59ef (Initial QUBIC CARBON app commit)
