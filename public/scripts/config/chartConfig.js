/**
 * ChartConfig class to encapsulate chart configuration details.
 */
export class ChartConfig {
    constructor(type, data, options = {}) {
        this.type = type;
        this.data = data;
        this.options = {
            responsive: true,
            ...options
        };
    }
}