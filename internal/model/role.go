package model

import "time"

// Role represents a role in the system with enhanced hierarchy and security features
type Role struct {
	ID               UUID              `bson:"_id"`
	Name             string            `bson:"name"`
	Code             string            `bson:"code"` // ROLE_ADMIN, ROLE_HR_MANAGER, etc.
	Description      string            `bson:"description"`
	Category         string            `bson:"category"` // system, business, department
	IsSystem         bool              `bson:"isSystem"`
	IsActive         bool              `bson:"isActive"`
	Hierarchy        RoleHierarchy     `bson:"hierarchy"`
	Permissions      RolePermissions   `bson:"permissions"`
	SecuritySettings RoleSecuritySettings `bson:"securitySettings"`
	Usage            RoleUsage         `bson:"usage"`
	Metadata         RoleMetadata      `bson:"metadata"`
}

// RoleHierarchy represents role hierarchy information
type RoleHierarchy struct {
	Level           int     `bson:"level"` // 1=entry, 2=associate, 3=lead, 4=manager, 5=director, 6=c-level
	ReportsTo       *UUID   `bson:"reportsTo,omitempty"` // reference to parent role
	DepartmentScope string  `bson:"departmentScope"` // all, specific, none
}

// RolePermissions represents permission configuration for a role
type RolePermissions struct {
	PermissionIds     []UUID  `bson:"permissionIds"`
	InheritedFrom     []UUID  `bson:"inheritedFrom"` // parent roles
	CustomPermissions []string `bson:"customPermissions"` // additional permissions
}

// RoleSecuritySettings contains security settings for a role
type RoleSecuritySettings struct {
	RequireTwoFactor      bool `bson:"requireTwoFactor"`
	AllowApiAccess        bool `bson:"allowApiAccess"`
	SessionTimeout        int  `bson:"sessionTimeout"` // minutes
	MaxConcurrentSessions int  `bson:"maxConcurrentSessions"`
}

// RoleUsage tracks usage statistics for a role
type RoleUsage struct {
	UserCount       int        `bson:"userCount"`
	LastAssignedAt  *time.Time `bson:"lastAssignedAt,omitempty"`
}

// RoleMetadata contains metadata about role record
type RoleMetadata struct {
	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
	CreatedBy *UUID     `bson:"createdBy,omitempty"`
	UpdatedBy *UUID     `bson:"updatedBy,omitempty"`
}
