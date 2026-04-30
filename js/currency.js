const currency = {
    format: function(amount) {
        // Ensure amount is a number
        const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
        if (isNaN(num)) return amount;
        
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    }
};

window.currency = currency;
