export default class CashflowTracker {
    constructor(querySelectorString) {
        this.root = document.querySelector(querySelectorString);
        this.root.innerHTML = CashflowTracker.Html();
        
        this.root.querySelector(".new-item").addEventListener("click", () => {
            this.OnNewItemBtnClick();
        });

        this.Load();
    }

    static Html() {
        return `
            <h1>Cashflow Tracker</h1>

            <table class="cf-tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="items">
                    
                </tbody>

                <tbody>
                    <tr>
                        <td class="controls" colspan="5">
                            <button class="new-item" type="button">New Item</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="summary" colspan="5">
                            <strong>Total:</strong>
                            <span class="total">R0.00</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    static ItemHtml() {
        return `
            <tr>
                <td>
                    <input class="input input-date" type="date" name="" id="">
                </td>
                <td>
                    <input class="input input-item" type="text" name="" id="" placeholder="e.g. Loan repayments">
                </td>
                <td>
                    <select class="input input-type" name="" id="">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </td>
                <td>
                    <input class="input input-amount" type="number" name="" id="">
                </td>
                <td>
                    <button class="delete-item">&#10005;</button>
                </td>
            </tr>
        `;
    }

    Load() {
        const items = JSON.parse(localStorage.getItem("cashflow-items") || "[]");

        for (const item of items) {
            this.AddItem(item);
        }

        this.UdateSummary();
    }

    UdateSummary() {
        const total = this.GetItemRows().reduce((total, row) => {
            const amount = row.querySelector(".input-amount").value;
            const isExpense = row.querySelector(".input-type").value === "expense";
            const modifier = isExpense ? -1 : 1;

            return total + (amount * modifier);
        }, 0);

        const totalFormatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "ZAR",
        }).format(total);

        this.root.querySelector(".total").textContent = totalFormatted;
    }

    Save() {
        const data = this.GetItemRows().map(row => {
            return {
                date: row.querySelector(".input-date").value,
                item: row.querySelector(".input-item").value,
                type: row.querySelector(".input-type").value,
                amount: row.querySelector(".input-amount").value,
            }
        });

        localStorage.setItem("cashflow-items", JSON.stringify(data));
        this.UdateSummary();
    }

    AddItem(item = {}) {
        this.root.querySelector(".items").insertAdjacentHTML("beforeend", CashflowTracker.ItemHtml());

        const row = this.root.querySelector(".items tr:last-of-type");

        row.querySelector(".input-date").value = item.date || new Date().toISOString().replace(/T.*/, "");
        row.querySelector(".input-item").value = item.item || "";
        row.querySelector(".input-type").value = item.type || "expense";
        row.querySelector(".input-amount").value = item.amount || 0;
        row.querySelector(".delete-item").addEventListener("click", e => {
            this.OnDeleteItemBtnClick(e);
        });

        row.querySelectorAll(".input").forEach(input => {
            input.addEventListener("change", () => this.Save());
        });

        this.Save();

    }

    GetItemRows() {
        return Array.from(this.root.querySelectorAll(".items tr"))
    }

    OnNewItemBtnClick() {
        this.AddItem();
    }

    OnDeleteItemBtnClick(e) {
        e.target.closest("tr").remove();
        this.Save();
    }
}