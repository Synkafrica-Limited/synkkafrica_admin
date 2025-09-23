import { ServiceEntity } from '../entities/service.entity.js';

/**
 * Service Repository - Handles all data operations for services
 */
export class ServiceRepository {
    constructor() {
        this.services = this.initializeMockData();
    }

    // Initialize with mock data based on the images
    initializeMockData() {
        const mockServices = [
            {
                id: 'SVC-1',
                name: 'Livery Lane',
                productName: 'Mercedes Benz Gle Coupe AMG',
                provider: 'Livery Lane',
                providerEmail: 'demo@liverylane.com',
                category: 'Car',
                package: 'Luxury package',
                capacity: 3,
                normalPrice: 190.00,
                discountedPrice: null,
                email: 'eodeyale@synkkafrica.com',
                status: 'Published',
                features: {
                    greatDeal: true,
                    airConditioning: true,
                    unlimitedMileage: true,
                    automatic: true
                },
                images: [
                    {
                        url: '/images/mercedes-gle.jpg',
                        alt: 'Mercedes Benz GLE Coupe AMG',
                        isPrimary: true,
                        uploadedAt: new Date()
                    }
                ],
                description: 'Luxury Mercedes Benz GLE Coupe AMG for premium transportation',
                location: 'Lagos, Nigeria',
                availability: 'Available',
                views: 245,
                bookings: 12,
                rating: 4.8,
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-01-20'),
                publishedAt: new Date('2024-01-16')
            },
            {
                id: 'SVC-2',
                name: 'Livery Lane',
                productName: 'Toyota Camry Standard',
                provider: 'Livery Lane',
                providerEmail: 'demo@liverylane.com',
                category: 'Car',
                package: 'Economy package',
                capacity: 4,
                normalPrice: 150.00,
                discountedPrice: null,
                email: 'eodeyale@synkkafrica.com',
                status: 'Draft',
                features: {
                    greatDeal: false,
                    airConditioning: true,
                    unlimitedMileage: false,
                    automatic: true
                },
                images: [],
                description: 'Reliable Toyota Camry for everyday transportation',
                location: 'Lagos, Nigeria',
                availability: 'Available',
                views: 89,
                bookings: 5,
                rating: 4.2,
                createdAt: new Date('2024-01-18'),
                updatedAt: new Date('2024-01-19')
            },
            {
                id: 'SVC-3',
                name: 'Gladiator',
                productName: 'Beach Resort Package',
                provider: 'Pura Vida',
                providerEmail: 'demo@gladiator.com',
                category: 'Beach',
                package: 'Luxury package',
                capacity: 2,
                normalPrice: 50.00,
                discountedPrice: null,
                email: 'demo@gladiator.com',
                status: 'Published',
                features: {
                    greatDeal: true,
                    airConditioning: true,
                    unlimitedMileage: true,
                    automatic: false
                },
                images: [],
                description: 'Premium beach resort experience with full amenities',
                location: 'Lekki, Lagos',
                availability: 'Available',
                views: 156,
                bookings: 23,
                rating: 4.6,
                createdAt: new Date('2024-01-10'),
                updatedAt: new Date('2024-01-15'),
                publishedAt: new Date('2024-01-12')
            },
            {
                id: 'SVC-4',
                name: 'Gladiator',
                productName: 'Premium Beach Day',
                provider: 'Bamboo',
                providerEmail: 'demo@gladiator.com',
                category: 'Beach',
                package: 'Luxury package',
                capacity: 4,
                normalPrice: 90.00,
                discountedPrice: null,
                email: 'demo@gladiator.com',
                status: 'Published',
                features: {
                    greatDeal: true,
                    airConditioning: false,
                    unlimitedMileage: true,
                    automatic: false
                },
                images: [],
                description: 'Full day beach experience with premium services',
                location: 'Victoria Island, Lagos',
                availability: 'Available',
                views: 203,
                bookings: 18,
                rating: 4.7,
                createdAt: new Date('2024-01-12'),
                updatedAt: new Date('2024-01-17'),
                publishedAt: new Date('2024-01-13')
            },
            {
                id: 'SVC-5',
                name: 'Gladiator',
                productName: 'Beach Club Access',
                provider: 'Sencilo',
                providerEmail: 'demo@sencilo.com',
                category: 'Beach',
                package: 'Basic package',
                capacity: 6,
                normalPrice: 150.00,
                discountedPrice: null,
                email: 'demo@sencilo.com',
                status: 'Draft',
                features: {
                    greatDeal: false,
                    airConditioning: true,
                    unlimitedMileage: false,
                    automatic: false
                },
                images: [],
                description: 'Access to exclusive beach club facilities',
                location: 'Ikoyi, Lagos',
                availability: 'Available',
                views: 67,
                bookings: 3,
                rating: 4.1,
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-01-21')
            },
            {
                id: 'SVC-6',
                name: 'Gladiator',
                productName: 'Sunset Beach Experience',
                provider: 'Yolo',
                providerEmail: 'demo@yolo.com',
                category: 'Beach',
                package: 'Premium package',
                capacity: 2,
                normalPrice: 50.00,
                discountedPrice: null,
                email: 'demo@yolo.com',
                status: 'Published',
                features: {
                    greatDeal: true,
                    airConditioning: false,
                    unlimitedMileage: true,
                    automatic: false
                },
                images: [],
                description: 'Romantic sunset experience at premium beach location',
                location: 'Lekki, Lagos',
                availability: 'Available',
                views: 134,
                bookings: 15,
                rating: 4.9,
                createdAt: new Date('2024-01-08'),
                updatedAt: new Date('2024-01-14'),
                publishedAt: new Date('2024-01-09')
            },
            {
                id: 'SVC-7',
                name: 'Soho',
                productName: 'Fine Dining Experience',
                provider: 'Soho',
                providerEmail: 'demo@soho.com',
                category: 'Dining',
                package: 'Premium package',
                capacity: 4,
                normalPrice: 150.00,
                discountedPrice: null,
                email: 'demo@soho.com',
                status: 'Published',
                features: {
                    greatDeal: true,
                    airConditioning: true,
                    unlimitedMileage: false,
                    automatic: false
                },
                images: [],
                description: 'Exquisite fine dining experience with premium menu',
                location: 'Victoria Island, Lagos',
                availability: 'Available',
                views: 178,
                bookings: 27,
                rating: 4.8,
                createdAt: new Date('2024-01-05'),
                updatedAt: new Date('2024-01-10'),
                publishedAt: new Date('2024-01-06')
            },
            {
                id: 'SVC-8',
                name: 'Cactus',
                productName: 'Mexican Cuisine Night',
                provider: 'Cactus',
                providerEmail: 'demo@cactus.com',
                category: 'Dining',
                package: 'Standard package',
                capacity: 6,
                normalPrice: 150.00,
                discountedPrice: null,
                email: 'demo@cactus.com',
                status: 'Draft',
                features: {
                    greatDeal: false,
                    airConditioning: true,
                    unlimitedMileage: false,
                    automatic: false
                },
                images: [],
                description: 'Authentic Mexican cuisine experience',
                location: 'Ikeja, Lagos',
                availability: 'Available',
                views: 92,
                bookings: 8,
                rating: 4.3,
                createdAt: new Date('2024-01-22'),
                updatedAt: new Date('2024-01-23')
            },
            {
                id: 'SVC-9',
                name: 'R&B',
                productName: 'Laundry Premium Service',
                provider: 'Yolo',
                providerEmail: 'demo@r&b.com',
                category: 'Laundry',
                package: 'Premium package',
                capacity: 1,
                normalPrice: 50.00,
                discountedPrice: null,
                email: 'demo@r&b.com',
                status: 'Published',
                features: {
                    greatDeal: true,
                    airConditioning: false,
                    unlimitedMileage: false,
                    automatic: true
                },
                images: [],
                description: 'Premium laundry service with pickup and delivery',
                location: 'Surulere, Lagos',
                availability: 'Available',
                views: 234,
                bookings: 45,
                rating: 4.5,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-05'),
                publishedAt: new Date('2024-01-02')
            }
        ];

        return mockServices.map(service => new ServiceEntity(service));
    }

    // Get all services with optional filtering
    async getAllServices(filters = {}) {
        try {
            let filteredServices = [...this.services];

            // Filter by category
            if (filters.category && filters.category !== 'All') {
                filteredServices = filteredServices.filter(service => 
                    service.category.toLowerCase() === filters.category.toLowerCase()
                );
            }

            // Filter by status
            if (filters.status && filters.status !== 'All') {
                filteredServices = filteredServices.filter(service => 
                    service.status.toLowerCase() === filters.status.toLowerCase()
                );
            }

            // Filter by provider
            if (filters.provider) {
                filteredServices = filteredServices.filter(service => 
                    service.provider.toLowerCase().includes(filters.provider.toLowerCase())
                );
            }

            // Search by name or product name
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                filteredServices = filteredServices.filter(service => 
                    service.name.toLowerCase().includes(searchTerm) ||
                    service.productName.toLowerCase().includes(searchTerm) ||
                    service.description.toLowerCase().includes(searchTerm)
                );
            }

            // Filter by price range
            if (filters.minPrice !== undefined) {
                filteredServices = filteredServices.filter(service => 
                    (service.discountedPrice || service.normalPrice) >= filters.minPrice
                );
            }

            if (filters.maxPrice !== undefined) {
                filteredServices = filteredServices.filter(service => 
                    (service.discountedPrice || service.normalPrice) <= filters.maxPrice
                );
            }

            // Sort services
            if (filters.sortBy) {
                filteredServices.sort((a, b) => {
                    switch (filters.sortBy) {
                        case 'name':
                            return a.name.localeCompare(b.name);
                        case 'price_low':
                            return (a.discountedPrice || a.normalPrice) - (b.discountedPrice || b.normalPrice);
                        case 'price_high':
                            return (b.discountedPrice || b.normalPrice) - (a.discountedPrice || a.normalPrice);
                        case 'rating':
                            return b.rating - a.rating;
                        case 'views':
                            return b.views - a.views;
                        case 'bookings':
                            return b.bookings - a.bookings;
                        case 'created_new':
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        case 'created_old':
                            return new Date(a.createdAt) - new Date(b.createdAt);
                        default:
                            return 0;
                    }
                });
            }

            // Pagination
            const page = filters.page || 1;
            const limit = filters.limit || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedServices = filteredServices.slice(startIndex, endIndex);

            return {
                services: paginatedServices,
                totalCount: filteredServices.length,
                totalPages: Math.ceil(filteredServices.length / limit),
                currentPage: page,
                hasNextPage: endIndex < filteredServices.length,
                hasPrevPage: startIndex > 0
            };
        } catch (error) {
            console.error('Error getting services:', error);
            throw new Error('Failed to retrieve services');
        }
    }

    // Get service by ID
    async getServiceById(serviceId) {
        try {
            const service = this.services.find(s => s.id === serviceId);
            if (!service) {
                throw new Error('Service not found');
            }
            return service;
        } catch (error) {
            console.error('Error getting service by ID:', error);
            throw error;
        }
    }

    // Create new service
    async createService(serviceData) {
        try {
            const newService = new ServiceEntity(serviceData);
            
            // Validate the service
            const validation = newService.validate();
            if (!validation.isValid) {
                throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
            }

            this.services.push(newService);
            return newService;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    }

    // Update service
    async updateService(serviceId, updateData) {
        try {
            const serviceIndex = this.services.findIndex(s => s.id === serviceId);
            if (serviceIndex === -1) {
                throw new Error('Service not found');
            }

            // Update the service data
            const updatedServiceData = { ...this.services[serviceIndex].toJSON(), ...updateData };
            const updatedService = new ServiceEntity(updatedServiceData);
            
            // Validate the updated service
            const validation = updatedService.validate();
            if (!validation.isValid) {
                throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
            }

            this.services[serviceIndex] = updatedService;
            return updatedService;
        } catch (error) {
            console.error('Error updating service:', error);
            throw error;
        }
    }

    // Delete service
    async deleteService(serviceId) {
        try {
            const serviceIndex = this.services.findIndex(s => s.id === serviceId);
            if (serviceIndex === -1) {
                throw new Error('Service not found');
            }

            const deletedService = this.services.splice(serviceIndex, 1)[0];
            return deletedService;
        } catch (error) {
            console.error('Error deleting service:', error);
            throw error;
        }
    }

    // Get service categories
    async getCategories() {
        try {
            const categories = [...new Set(this.services.map(service => service.category))];
            return categories.sort();
        } catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }

    // Get service packages
    async getPackages() {
        try {
            const packages = [...new Set(this.services.map(service => service.package))];
            return packages.sort();
        } catch (error) {
            console.error('Error getting packages:', error);
            throw error;
        }
    }

    // Get service statistics
    async getServiceStats() {
        try {
            const totalServices = this.services.length;
            const publishedServices = this.services.filter(s => s.status === 'Published').length;
            const draftServices = this.services.filter(s => s.status === 'Draft').length;
            const totalViews = this.services.reduce((sum, s) => sum + s.views, 0);
            const totalBookings = this.services.reduce((sum, s) => sum + s.bookings, 0);
            const averageRating = this.services.reduce((sum, s) => sum + s.rating, 0) / totalServices;

            // Category breakdown
            const categoryStats = {};
            this.services.forEach(service => {
                categoryStats[service.category] = (categoryStats[service.category] || 0) + 1;
            });

            return {
                totalServices,
                publishedServices,
                draftServices,
                totalViews,
                totalBookings,
                averageRating: parseFloat(averageRating.toFixed(1)),
                categoryBreakdown: categoryStats
            };
        } catch (error) {
            console.error('Error getting service stats:', error);
            throw error;
        }
    }

    // Search services
    async searchServices(searchTerm, filters = {}) {
        try {
            const searchFilters = {
                ...filters,
                search: searchTerm
            };
            return await this.getAllServices(searchFilters);
        } catch (error) {
            console.error('Error searching services:', error);
            throw error;
        }
    }

    // Clone service
    async cloneService(serviceId) {
        try {
            const originalService = await this.getServiceById(serviceId);
            const clonedService = originalService.clone();
            clonedService.name = `${clonedService.name} (Copy)`;
            
            this.services.push(clonedService);
            return clonedService;
        } catch (error) {
            console.error('Error cloning service:', error);
            throw error;
        }
    }

    // Bulk update services
    async bulkUpdateServices(serviceIds, updateData) {
        try {
            const updatedServices = [];
            
            for (const serviceId of serviceIds) {
                const updatedService = await this.updateService(serviceId, updateData);
                updatedServices.push(updatedService);
            }
            
            return updatedServices;
        } catch (error) {
            console.error('Error bulk updating services:', error);
            throw error;
        }
    }

    // Get featured services
    async getFeaturedServices(limit = 5) {
        try {
            const featuredServices = this.services
                .filter(service => service.status === 'Published' && service.hasGreatDeal())
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limit);
            
            return featuredServices;
        } catch (error) {
            console.error('Error getting featured services:', error);
            throw error;
        }
    }
}

export default ServiceRepository;
