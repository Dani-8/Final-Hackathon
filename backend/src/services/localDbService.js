import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOCK_DB_FILE = path.join(__dirname, '..', 'uploads', 'mock_db.json');

// Initialize local memory store with default seed data
let db = {
  users: [
    // Default seeded admin user (password: admin123)
    {
      _id: 'u_admin_1',
      name: 'System Admin',
      email: 'admin@maintainiq.com',
      passwordHash: '$2b$10$GzpYkF50Qo5x2GwPPIoCfuCyrjuCeqgC0gbY0MzLyk5ggnZkHL86W', // bcrypt hash of admin123
      role: 'admin',
      createdAt: new Date('2026-01-01T00:00:00Z')
    },
    // Default seeded technician (password: tech123)
    {
      _id: 'u_tech_1',
      name: 'John Technician',
      email: 'tech@maintainiq.com',
      passwordHash: '$2b$10$Fq79lkrOMDMG10s7cfW7/eWP.rQ.kZAHctefdcU7PGrdGMWHyiKgy', // bcrypt hash of tech123
      role: 'technician',
      createdAt: new Date('2026-01-01T00:00:00Z')
    }
  ],
  assets: [],
  issues: [],
  maintenanceRecords: [],
  historyLogs: [],
  categories: [
    { _id: 'cat_1', name: 'HVAC', createdAt: new Date('2026-01-01T00:00:00Z') },
    { _id: 'cat_2', name: 'Electrical', createdAt: new Date('2026-01-01T00:00:00Z') },
    { _id: 'cat_3', name: 'Plumbing', createdAt: new Date('2026-01-01T00:00:00Z') },
    { _id: 'cat_4', name: 'Fire Safety', createdAt: new Date('2026-01-01T00:00:00Z') },
    { _id: 'cat_5', name: 'Machinery', createdAt: new Date('2026-01-01T00:00:00Z') },
    { _id: 'cat_6', name: 'IT Infrastructure', createdAt: new Date('2026-01-01T00:00:00Z') }
  ]
};

function ensureDirExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function loadDB() {
  try {
    ensureDirExists(MOCK_DB_FILE);
    if (fs.existsSync(MOCK_DB_FILE)) {
      const content = fs.readFileSync(MOCK_DB_FILE, 'utf8');
      if (content.trim()) {
        const parsed = JSON.parse(content);
        // Merge with defaults to ensure we don't wipe out seed data if empty
        db = {
          users: parsed.users || db.users,
          assets: parsed.assets || db.assets,
          issues: parsed.issues || db.issues,
          maintenanceRecords: parsed.maintenanceRecords || db.maintenanceRecords,
          historyLogs: parsed.historyLogs || db.historyLogs,
          categories: parsed.categories || db.categories
        };
      }
    } else {
      saveDB();
    }
  } catch (err) {
    console.error('Error loading mock database, using memory-only:', err.message);
  }
}

function saveDB() {
  try {
    ensureDirExists(MOCK_DB_FILE);
    fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving mock database:', err.message);
  }
}

// Load database immediately
loadDB();

export const localDb = {
  // Collection Operations
  users: {
    find: (filter = {}) => {
      loadDB();
      return db.users.filter(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      });
    },
    findOne: (filter = {}) => {
      loadDB();
      return db.users.find(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      }) || null;
    },
    findById: (id) => {
      loadDB();
      return db.users.find(item => item._id === id) || null;
    },
    create: (data) => {
      const newUser = {
        _id: 'u_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data
      };
      db.users.push(newUser);
      saveDB();
      return newUser;
    },
    findByIdAndDelete: (id) => {
      loadDB();
      const idx = db.users.findIndex(item => item._id === id);
      if (idx === -1) return null;
      const deleted = db.users[idx];
      db.users.splice(idx, 1);
      saveDB();
      return deleted;
    },
    findByIdAndUpdate: (id, updates) => {
      loadDB();
      const idx = db.users.findIndex(item => item._id === id);
      if (idx === -1) return null;
      db.users[idx] = { ...db.users[idx], ...updates };
      saveDB();
      return db.users[idx];
    }
  },

  assets: {
    find: (filter = {}) => {
      loadDB();
      return db.assets.filter(item => {
        for (let key in filter) {
          if (filter[key] !== undefined && item[key] !== filter[key]) return false;
        }
        return true;
      });
    },
    findOne: (filter = {}) => {
      loadDB();
      return db.assets.find(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      }) || null;
    },
    findById: (id) => {
      loadDB();
      return db.assets.find(item => item._id === id) || null;
    },
    create: (data) => {
      const newAsset = {
        _id: 'a_' + Math.random().toString(36).substr(2, 9),
        assignedTechnician: null,
        lastServiceDate: null,
        nextServiceDate: null,
        isRetired: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data
      };
      db.assets.push(newAsset);
      saveDB();
      return newAsset;
    },
    findByIdAndUpdate: (id, update) => {
      loadDB();
      const idx = db.assets.findIndex(item => item._id === id);
      if (idx === -1) return null;
      db.assets[idx] = {
        ...db.assets[idx],
        ...update,
        updatedAt: new Date()
      };
      saveDB();
      return db.assets[idx];
    }
  },

  issues: {
    find: (filter = {}) => {
      loadDB();
      return db.issues.filter(item => {
        for (let key in filter) {
          if (filter[key] !== undefined && item[key] !== filter[key]) return false;
        }
        return true;
      });
    },
    findOne: (filter = {}) => {
      loadDB();
      return db.issues.find(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      }) || null;
    },
    findById: (id) => {
      loadDB();
      return db.issues.find(item => item._id === id) || null;
    },
    create: (data) => {
      const newIssue = {
        _id: 'i_' + Math.random().toString(36).substr(2, 9),
        assignedTechnician: null,
        evidenceUrls: [],
        aiSuggested: data.aiSuggested || { title: '', category: '', priority: '', causes: [], checks: [] },
        completedChecks: data.completedChecks || [],
        aiFieldsEdited: data.aiFieldsEdited || false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data
      };
      db.issues.push(newIssue);
      saveDB();
      return newIssue;
    },
    findByIdAndUpdate: (id, update) => {
      loadDB();
      const idx = db.issues.findIndex(item => item._id === id);
      if (idx === -1) return null;
      db.issues[idx] = {
        ...db.issues[idx],
        ...update,
        updatedAt: new Date()
      };
      saveDB();
      return db.issues[idx];
    }
  },

  maintenanceRecords: {
    find: (filter = {}) => {
      loadDB();
      return db.maintenanceRecords.filter(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      });
    },
    create: (data) => {
      const newRecord = {
        _id: 'm_' + Math.random().toString(36).substr(2, 9),
        resolvedAt: new Date(),
        ...data
      };
      db.maintenanceRecords.push(newRecord);
      saveDB();
      return newRecord;
    }
  },

  historyLogs: {
    find: (filter = {}) => {
      loadDB();
      return db.historyLogs.filter(item => {
        for (let key in filter) {
          if (filter[key] !== undefined && item[key] !== filter[key]) return false;
        }
        return true;
      });
    },
    create: (data) => {
      const newLog = {
        _id: 'h_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data
      };
      db.historyLogs.push(newLog);
      saveDB();
      return newLog;
    }
  },

  categories: {
    find: (filter = {}) => {
      loadDB();
      return db.categories.filter(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      });
    },
    findOne: (filter = {}) => {
      loadDB();
      return db.categories.find(item => {
        for (let key in filter) {
          if (item[key] !== filter[key]) return false;
        }
        return true;
      }) || null;
    },
    create: (data) => {
      const newCategory = {
        _id: 'cat_' + Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data
      };
      db.categories.push(newCategory);
      saveDB();
      return newCategory;
    }
  }
};
