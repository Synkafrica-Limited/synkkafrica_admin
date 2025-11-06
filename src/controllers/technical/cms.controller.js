import ServiceRepository from '../../models/repositories/service.repository.js';

/**
 * CMS Controller - Handles all CMS operations for services and listings
 */
export class CMSController {
    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    // Get all services with filtering and pagination
    async getAllServices(filters = {}) {
        try {
            const result = await this.serviceRepository.getAllServices(filters);
            return {
                success: true,
                data: result,
                message: 'Services retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting services:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to retrieve services'
            };
        }
    }

    // Get service by ID
    async getServiceById(serviceId) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            const service = await this.serviceRepository.getServiceById(serviceId);
            return {
                success: true,
                data: service,
                message: 'Service retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to retrieve service'
            };
        }
    }

    // Create new service
    async createService(serviceData, userId = null) {
        try {
            // Add metadata
            const enrichedData = {
                ...serviceData,
                createdBy: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const newService = await this.serviceRepository.createService(enrichedData);
            
            return {
                success: true,
                data: newService,
                message: 'Service created successfully'
            };
        } catch (error) {
            console.error('CMSController - Error creating service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to create service'
            };
        }
    }

    // Update service
    async updateService(serviceId, updateData, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            // Add update metadata
            const enrichedData = {
                ...updateData,
                updatedAt: new Date()
            };

            const updatedService = await this.serviceRepository.updateService(serviceId, enrichedData);
            
            return {
                success: true,
                data: updatedService,
                message: 'Service updated successfully'
            };
        } catch (error) {
            console.error('CMSController - Error updating service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to update service'
            };
        }
    }

    // Delete service
    async deleteService(serviceId) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            const deletedService = await this.serviceRepository.deleteService(serviceId);
            
            return {
                success: true,
                data: deletedService,
                message: 'Service deleted successfully'
            };
        } catch (error) {
            console.error('CMSController - Error deleting service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to delete service'
            };
        }
    }

    // Publish service
    async publishService(serviceId, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            const service = await this.serviceRepository.getServiceById(serviceId);
            
            // Validate service before publishing
            const validation = service.validate();
            if (!validation.isValid) {
                return {
                    success: false,
                    data: null,
                    message: `Cannot publish service: ${validation.errors.join(', ')}`
                };
            }

            const updatedService = await this.serviceRepository.updateService(serviceId, {
                status: 'Published',
                publishedAt: new Date(),
                updatedAt: new Date()
            });
            
            return {
                success: true,
                data: updatedService,
                message: 'Service published successfully'
            };
        } catch (error) {
            console.error('CMSController - Error publishing service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to publish service'
            };
        }
    }

    // Unpublish service
    async unpublishService(serviceId, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            const updatedService = await this.serviceRepository.updateService(serviceId, {
                status: 'Draft',
                updatedAt: new Date()
            });
            
            return {
                success: true,
                data: updatedService,
                message: 'Service unpublished successfully'
            };
        } catch (error) {
            console.error('CMSController - Error unpublishing service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to unpublish service'
            };
        }
    }

    // Clone service
    async cloneService(serviceId, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            const clonedService = await this.serviceRepository.cloneService(serviceId);
            clonedService.createdBy = userId;
            
            return {
                success: true,
                data: clonedService,
                message: 'Service cloned successfully'
            };
        } catch (error) {
            console.error('CMSController - Error cloning service:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to clone service'
            };
        }
    }

    // Bulk operations
    async bulkUpdateServices(serviceIds, updateData, userId = null) {
        try {
            if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
                throw new Error('Service IDs are required');
            }

            const enrichedData = {
                ...updateData,
                updatedAt: new Date()
            };

            const updatedServices = await this.serviceRepository.bulkUpdateServices(serviceIds, enrichedData);
            
            return {
                success: true,
                data: updatedServices,
                message: `${updatedServices.length} services updated successfully`
            };
        } catch (error) {
            console.error('CMSController - Error bulk updating services:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to update services'
            };
        }
    }

    // Get categories
    async getCategories() {
        try {
            const categories = await this.serviceRepository.getCategories();
            
            // Add predefined categories that might not be in use yet
            const predefinedCategories = ['Car', 'Beach', 'Dining', 'Conveniences', 'Laundry', 'Other'];
            const allCategories = [...new Set([...predefinedCategories, ...categories])];
            
            return {
                success: true,
                data: allCategories.sort(),
                message: 'Categories retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting categories:', error);
            return {
                success: false,
                data: [],
                message: error.message || 'Failed to retrieve categories'
            };
        }
    }

    // Get packages
    async getPackages() {
        try {
            const packages = await this.serviceRepository.getPackages();
            
            // Add predefined packages
            const predefinedPackages = ['Basic package', 'Standard package', 'Premium package', 'Luxury package', 'Economy package'];
            const allPackages = [...new Set([...predefinedPackages, ...packages])];
            
            return {
                success: true,
                data: allPackages.sort(),
                message: 'Packages retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting packages:', error);
            return {
                success: false,
                data: [],
                message: error.message || 'Failed to retrieve packages'
            };
        }
    }

    // Get service statistics
    async getServiceStats() {
        try {
            const stats = await this.serviceRepository.getServiceStats();
            
            return {
                success: true,
                data: stats,
                message: 'Service statistics retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting service stats:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to retrieve service statistics'
            };
        }
    }

    // Search services
    async searchServices(searchTerm, filters = {}) {
        try {
            if (!searchTerm || searchTerm.trim().length === 0) {
                return await this.getAllServices(filters);
            }

            const result = await this.serviceRepository.searchServices(searchTerm.trim(), filters);
            
            return {
                success: true,
                data: result,
                message: `Found ${result.totalCount} services matching "${searchTerm}"`
            };
        } catch (error) {
            console.error('CMSController - Error searching services:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to search services'
            };
        }
    }

    // Get featured services
    async getFeaturedServices(limit = 5) {
        try {
            const featuredServices = await this.serviceRepository.getFeaturedServices(limit);
            
            return {
                success: true,
                data: featuredServices,
                message: 'Featured services retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting featured services:', error);
            return {
                success: false,
                data: [],
                message: error.message || 'Failed to retrieve featured services'
            };
        }
    }

    // Upload service image
    async uploadServiceImage(serviceId, imageFile, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            if (!imageFile) {
                throw new Error('Image file is required');
            }

            // In a real implementation, you would upload to a cloud storage service
            // For now, we'll simulate the upload
            const imageUrl = `/uploads/services/${serviceId}/${Date.now()}_${imageFile.name}`;
            
            const service = await this.serviceRepository.getServiceById(serviceId);
            service.addImage(imageUrl, imageFile.name);
            
            const updatedService = await this.serviceRepository.updateService(serviceId, service.toJSON());
            
            return {
                success: true,
                data: {
                    service: updatedService,
                    imageUrl: imageUrl
                },
                message: 'Image uploaded successfully'
            };
        } catch (error) {
            console.error('CMSController - Error uploading image:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to upload image'
            };
        }
    }

    // Remove service image
    async removeServiceImage(serviceId, imageIndex, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            if (imageIndex === undefined || imageIndex < 0) {
                throw new Error('Valid image index is required');
            }

            const service = await this.serviceRepository.getServiceById(serviceId);
            service.removeImage(imageIndex);
            
            const updatedService = await this.serviceRepository.updateService(serviceId, service.toJSON());
            
            return {
                success: true,
                data: updatedService,
                message: 'Image removed successfully'
            };
        } catch (error) {
            console.error('CMSController - Error removing image:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to remove image'
            };
        }
    }

    // Set primary image
    async setPrimaryImage(serviceId, imageIndex, userId = null) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            if (imageIndex === undefined || imageIndex < 0) {
                throw new Error('Valid image index is required');
            }

            const service = await this.serviceRepository.getServiceById(serviceId);
            service.setPrimaryImage(imageIndex);
            
            const updatedService = await this.serviceRepository.updateService(serviceId, service.toJSON());
            
            return {
                success: true,
                data: updatedService,
                message: 'Primary image updated successfully'
            };
        } catch (error) {
            console.error('CMSController - Error setting primary image:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to set primary image'
            };
        }
    }

    // Get service analytics
    async getServiceAnalytics(serviceId, dateRange = {}) {
        try {
            if (!serviceId) {
                throw new Error('Service ID is required');
            }

            const service = await this.serviceRepository.getServiceById(serviceId);
            
            // In a real implementation, you would query analytics data
            // For now, we'll return the basic metrics from the service
            const analytics = {
                serviceId: service.id,
                name: service.name,
                views: service.views,
                bookings: service.bookings,
                rating: service.rating,
                reviewCount: service.reviews.length,
                revenue: service.bookings * (service.discountedPrice || service.normalPrice),
                conversionRate: service.views > 0 ? ((service.bookings / service.views) * 100).toFixed(2) : 0,
                status: service.status,
                createdAt: service.createdAt,
                publishedAt: service.publishedAt
            };
            
            return {
                success: true,
                data: analytics,
                message: 'Service analytics retrieved successfully'
            };
        } catch (error) {
            console.error('CMSController - Error getting service analytics:', error);
            return {
                success: false,
                data: null,
                message: error.message || 'Failed to retrieve service analytics'
            };
        }
    }
}

// Create and export a singleton instance
const cmsController = new CMSController();
export default cmsController;