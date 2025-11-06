/**
 * Service Entity - Represents a service/listing that can be offered by vendors
 */
export class ServiceEntity {
    constructor(data = {}) {
        this.id = data.id || this.generateServiceId();
        this.name = data.name || '';
        this.productName = data.productName || '';
        this.provider = data.provider || '';
        this.providerEmail = data.providerEmail || '';
        this.category = data.category || 'Other';
        this.package = data.package || 'Basic';
        this.capacity = data.capacity || 1;
        this.normalPrice = data.normalPrice || 0;
        this.discountedPrice = data.discountedPrice || null;
        this.email = data.email || '';
        this.status = data.status || 'Draft';
        this.features = {
            greatDeal: data.features?.greatDeal || false,
            airConditioning: data.features?.airConditioning || false,
            unlimitedMileage: data.features?.unlimitedMileage || false,
            automatic: data.features?.automatic || false
        };
        this.images = data.images || [];
        this.description = data.description || '';
        this.location = data.location || '';
        this.availability = data.availability || 'Available';
        this.vendorId = data.vendorId || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.createdBy = data.createdBy || null;
        this.publishedAt = data.publishedAt || null;
        this.views = data.views || 0;
        this.bookings = data.bookings || 0;
        this.rating = data.rating || 0;
        this.reviews = data.reviews || [];
    }

    generateServiceId() {
        return 'SVC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    }

    // Get formatted price with currency
    getFormattedPrice() {
        const price = this.discountedPrice || this.normalPrice;
        return `$${price.toFixed(2)}`;
    }

    // Get original price for display when there's a discount
    getOriginalPrice() {
        if (this.discountedPrice && this.discountedPrice < this.normalPrice) {
            return `$${this.normalPrice.toFixed(2)}`;
        }
        return null;
    }

    // Calculate discount percentage
    getDiscountPercentage() {
        if (this.discountedPrice && this.discountedPrice < this.normalPrice) {
            return Math.round(((this.normalPrice - this.discountedPrice) / this.normalPrice) * 100);
        }
        return 0;
    }

    // Check if service has great deal
    hasGreatDeal() {
        return this.features.greatDeal || this.getDiscountPercentage() >= 20;
    }

    // Update service status
    updateStatus(newStatus, userId = null) {
        this.status = newStatus;
        this.updatedAt = new Date();
        
        if (newStatus === 'Published' && !this.publishedAt) {
            this.publishedAt = new Date();
        }
        
        return this;
    }

    // Add image to service
    addImage(imageUrl, alt = '') {
        this.images.push({
            url: imageUrl,
            alt: alt,
            isPrimary: this.images.length === 0,
            uploadedAt: new Date()
        });
        this.updatedAt = new Date();
        return this;
    }

    // Remove image from service
    removeImage(imageIndex) {
        if (imageIndex >= 0 && imageIndex < this.images.length) {
            this.images.splice(imageIndex, 1);
            this.updatedAt = new Date();
        }
        return this;
    }

    // Set primary image
    setPrimaryImage(imageIndex) {
        this.images.forEach((img, index) => {
            img.isPrimary = index === imageIndex;
        });
        this.updatedAt = new Date();
        return this;
    }

    // Get primary image
    getPrimaryImage() {
        return this.images.find(img => img.isPrimary) || this.images[0] || null;
    }

    // Add review
    addReview(review) {
        this.reviews.push({
            id: Date.now().toString(),
            rating: review.rating,
            comment: review.comment,
            customerName: review.customerName,
            customerId: review.customerId,
            createdAt: new Date()
        });
        this.updateRating();
        return this;
    }

    // Update average rating
    updateRating() {
        if (this.reviews.length === 0) {
            this.rating = 0;
            return;
        }
        
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating = parseFloat((totalRating / this.reviews.length).toFixed(1));
    }

    // Increment view count
    incrementViews() {
        this.views++;
        return this;
    }

    // Increment booking count
    incrementBookings() {
        this.bookings++;
        return this;
    }

    // Check if service is available
    isAvailable() {
        return this.status === 'Published' && this.availability === 'Available';
    }

    // Get service features as array
    getActiveFeatures() {
        return Object.entries(this.features)
            .filter(([key, value]) => value)
            .map(([key]) => key);
    }

    // Clone service (for creating variations)
    clone() {
        const clonedData = JSON.parse(JSON.stringify(this));
        clonedData.id = null; // Generate new ID
        clonedData.createdAt = new Date();
        clonedData.updatedAt = new Date();
        clonedData.publishedAt = null;
        clonedData.status = 'Draft';
        clonedData.views = 0;
        clonedData.bookings = 0;
        clonedData.reviews = [];
        clonedData.rating = 0;
        
        return new ServiceEntity(clonedData);
    }

    // Convert to plain object for API
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            productName: this.productName,
            provider: this.provider,
            providerEmail: this.providerEmail,
            category: this.category,
            package: this.package,
            capacity: this.capacity,
            normalPrice: this.normalPrice,
            discountedPrice: this.discountedPrice,
            email: this.email,
            status: this.status,
            features: this.features,
            images: this.images,
            description: this.description,
            location: this.location,
            availability: this.availability,
            vendorId: this.vendorId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            createdBy: this.createdBy,
            publishedAt: this.publishedAt,
            views: this.views,
            bookings: this.bookings,
            rating: this.rating,
            reviews: this.reviews
        };
    }

    // Create from plain object
    static fromJSON(data) {
        return new ServiceEntity(data);
    }

    // Validate service data
    validate() {
        const errors = [];

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Service name is required');
        }

        if (!this.category || this.category === 'Choose category') {
            errors.push('Category is required');
        }

        if (!this.provider || this.provider.trim().length === 0) {
            errors.push('Provider is required');
        }

        if (this.normalPrice <= 0) {
            errors.push('Price must be greater than 0');
        }

        if (this.discountedPrice && this.discountedPrice >= this.normalPrice) {
            errors.push('Discounted price must be less than normal price');
        }

        if (this.capacity <= 0) {
            errors.push('Capacity must be greater than 0');
        }

        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push('Valid email is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Email validation helper
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

export default ServiceEntity;
