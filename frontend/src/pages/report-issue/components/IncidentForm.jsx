import React from 'react';
import { Upload, Trash2 } from 'lucide-react';

export function IncidentForm({
    title,
    setTitle,
    category,
    setCategory,
    priority,
    setPriority,
    setAiFieldsEdited,
    evidenceFiles,
    handleFileUpload,
    removeFile,
    uploadLoading,
    reporterName,
    setReporterName,
    reporterContact,
    setReporterContact,
    setTriageResult,
    submitLoading,
    handleSubmitIssue,
}) {
    return (
        <form onSubmit={handleSubmitIssue} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">Verify Incident Specifications</h3>

            {/* Editable Title */}
            <div>
                <label htmlFor="issue-title" className="block text-sm font-semibold text-slate-700">Issue Header/Title</label>
                <input
                    id="issue-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setAiFieldsEdited(true);
                    }}
                    className="mt-1.5 block w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                    <label htmlFor="issue-category" className="block text-sm font-semibold text-slate-700">Category</label>
                    <select
                        id="issue-category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setAiFieldsEdited(true);
                        }}
                        className="mt-1.5 block w-full px-3.5 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                        <option value="HVAC">HVAC</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Fire Safety">Fire Safety</option>
                        <option value="Machinery">Machinery</option>
                        <option value="IT Infrastructure">IT Infrastructure</option>
                    </select>
                </div>

                {/* Priority */}
                <div>
                    <label htmlFor="issue-priority" className="block text-sm font-semibold text-slate-700">Priority Level</label>
                    <select
                        id="issue-priority"
                        value={priority}
                        onChange={(e) => {
                            setPriority(e.target.value);
                            setAiFieldsEdited(true);
                        }}
                        className="mt-1.5 block w-full px-3.5 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
            </div>

            {/* Upload evidence images/videos */}
            <div>
                <label className="block text-sm font-semibold text-slate-700">Evidence Attachments (Photos/Videos)</label>
                <div className="mt-2 flex flex-wrap gap-4 items-center">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-slate-100 rounded-xl px-6 py-4 cursor-pointer transition-colors max-w-[200px]">
                        <Upload className="w-5 h-5 text-indigo-500 mb-1" />
                        <span className="text-xs font-bold text-slate-700">Attach file</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Image/Video to 15MB</span>
                        
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>

                    {evidenceFiles.map((file, idx) => (
                        <div key={idx} className="relative w-24 h-24 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-inner group">
                            <img src={file.url} alt="Evidence" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
                {uploadLoading && (
                    <p className="text-xs text-indigo-600 mt-2 animate-pulse">Uploading evidence file to media servers...</p>
                )}
            </div>


            {/* Reporter Profile */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-800">Your Contact Profiles</h4>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="reporter-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Name</label>
                        <input
                            id="reporter-name"
                            type="text"
                            required
                            value={reporterName}
                            onChange={(e) => setReporterName(e.target.value)}
                            placeholder="e.g. Robert Smith"
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="reporter-contact" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone / Email (Optional)</label>
                        <input
                            id="reporter-contact"
                            type="text"
                            value={reporterContact}
                            onChange={(e) => setReporterContact(e.target.value)}
                            placeholder="e.g. robert@mail.com"
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>


            <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => setTriageResult(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    Back / Rewrite description
                </button>

                <button
                    id="submit-issue-btn"
                    type="submit"
                    disabled={submitLoading || uploadLoading}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                    {submitLoading ? 'Submitting...' : 'Confirm and Submit Incident'}
                </button>
            </div>
        </form>
    );
}
