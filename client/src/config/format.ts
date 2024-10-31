function formatAmount(amount: number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default formatAmount;
