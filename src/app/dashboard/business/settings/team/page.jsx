"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import TeamMemberModal from "@/views/layouts/components/modals/TeamMemberModal";
import ConfirmDialog from "@/views/layouts/components/modals/ConfirmDialog";
import { useToast } from "@/views/layouts/components/ToastContainer";
import { teamMembers as initialTeamMembers, roles, allPermissions } from "@/models/entities/team.entity";
import { FaUserPlus, FaEdit, FaTrash, FaEye, FaUsers, FaUserCheck, FaUserClock, FaShieldAlt } from "react-icons/fa";

export default function TeamManagementPage() { 
  const { showSuccess, showError, showInfo } = useToast();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  // Stats
  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    inactive: teamMembers.filter(m => m.status === 'inactive').length,
  };

  // Role counts
  const roleCounts = roles.reduce((acc, role) => {
    acc[role.name] = teamMembers.filter(m => m.role === role.name).length;
    return acc;
  }, {});

  // Filter groups
  const filterGroups = [
    {
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "All", count: stats.total },
        { value: "active", label: "Active", count: stats.active },
        { value: "inactive", label: "Inactive", count: stats.inactive },
      ]
    },
    {
      label: "Role",
      value: roleFilter,
      onChange: setRoleFilter,
      options: [
        { value: "all", label: "All Roles", count: stats.total },
        ...roles.map(role => ({
          value: role.name,
          label: role.name,
          count: roleCounts[role.name] || 0
        }))
      ]
    }
  ];

  // Filtered members
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = searchQuery === "" || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowMemberModal(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeleteDialog(true);
  };

  const handleViewPermissions = (member) => {
    setSelectedMember(member);
    setShowPermissionsModal(true);
  };

  const handleSubmitMember = async (formData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (selectedMember) {
      // Update existing member
      setTeamMembers(teamMembers.map(m => 
        m.id === selectedMember.id 
          ? { ...m, ...formData, lastActive: new Date().toISOString().split('T')[0] }
          : m
      ));
      showSuccess(`${formData.name} updated successfully`);
    } else {
      // Add new member
      const newMember = {
        id: `TM-${String(teamMembers.length + 1).padStart(3, '0')}`,
        ...formData,
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      };
      setTeamMembers([...teamMembers, newMember]);
      showSuccess(`${formData.name} added successfully`);
    }

    setIsLoading(false);
    setShowMemberModal(false);
    setSelectedMember(null);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTeamMembers(teamMembers.filter(m => m.id !== selectedMember.id));
    showSuccess(`${selectedMember.name} removed from team`);
    
    setIsLoading(false);
    setShowDeleteDialog(false);
    setSelectedMember(null);
  };

  const handleExport = () => {
    showInfo("Exporting team data...");
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-300">
        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
        Inactive
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Settings" />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <BusinessHeader 
          title="Team Management" 
          subtitle="Manage team members, roles, and permissions" 
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaUsers className="text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Total Members</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</p>
              <p className="text-xs text-gray-500">All team members</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FaUserCheck className="text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Active</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.active}</p>
              <p className="text-xs text-gray-500">Currently active</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <FaUserClock className="text-gray-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Inactive</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.inactive}</p>
              <p className="text-xs text-gray-500">Not active</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <FaShieldAlt className="text-orange-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Roles</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{roles.length}</p>
              <p className="text-xs text-gray-500">Available roles</p>
            </div>
          </div>

          {/* Filters and Add Button */}
          <DataFilters 
            searchQuery={searchQuery}
            onSearchChange={(value) => setSearchQuery(value)}
            searchPlaceholder="Search by name, email, or department"
            filterGroups={filterGroups}
            showExport={true}
            onExport={handleExport}
            customActions={
              <button
                onClick={handleAddMember}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <FaUserPlus />
                Add Member
              </button>
            }
          />

          {/* Team Members Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Department</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-500">
                        <FaUsers className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="text-sm">No team members found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{member.role}</div>
                            <div className="text-xs text-gray-500">{member.department}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewPermissions(member)}
                            className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                          >
                            <FaShieldAlt className="text-xs" />
                            {member.permissions.length} permissions
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(member.status)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{member.lastActive}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditMember(member)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit member"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(member)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove member"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Distribution by Role</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {roles.map(role => (
                <div key={role.name} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{roleCounts[role.name] || 0}</div>
                  <div className="text-xs text-gray-600 mt-1">{role.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={showMemberModal}
        onClose={() => {
          setShowMemberModal(false);
          setSelectedMember(null);
        }}
        onSubmit={handleSubmitMember}
        member={selectedMember}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedMember(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${selectedMember?.name} from the team? This action cannot be undone.`}
        type="danger"
        confirmText="Remove"
        cancelText="Cancel"
        isLoading={isLoading}
      />

      {/* Permissions View Modal */}
      {showPermissionsModal && selectedMember && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => {
            setShowPermissionsModal(false);
            setSelectedMember(null);
          }}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedMember.name}'s Permissions</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedMember.role} - {selectedMember.department}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(
                  allPermissions
                    .filter(p => selectedMember.permissions.includes(p.id))
                    .reduce((acc, permission) => {
                      if (!acc[permission.category]) {
                        acc[permission.category] = [];
                      }
                      acc[permission.category].push(permission);
                      return acc;
                    }, {})
                ).map(([category, perms]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
                    <ul className="space-y-2">
                      {perms.map(permission => (
                        <li key={permission.id} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {permission.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => {
                  setShowPermissionsModal(false);
                  setSelectedMember(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
