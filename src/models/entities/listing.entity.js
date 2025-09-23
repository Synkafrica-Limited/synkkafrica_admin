/**
 * Listing Entity - Represents a listing (legacy support for existing code)
 * This class is maintained for backward compatibility and delegates to ServiceEntity
 */
import { ServiceEntity } from './service.entity.js';

export class ListingEntity extends ServiceEntity {
    constructor(data = {}) {
        super(data);
        // Add any listing-specific properties here if needed
        this.type = 'listing';
    }

    // Override or add listing-specific methods here if needed
    static fromService(service) {
        const listingData = service.toJSON();
        return new ListingEntity(listingData);
    }

    toListing() {
        return {
            ...this.toJSON(),
            type: 'listing'
        };
    }
}

export default ListingEntity;