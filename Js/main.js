document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');

    function openMenu() {
        menu.classList.remove('hidden');
        menu.classList.remove('translate-x-20'); 
        menu.classList.add('translate-x-0');
    }

    function closeMenu() {
        menu.classList.add('hidden');
    }

    toggle.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    const items = menu.querySelectorAll('a, button');
    items.forEach(item => {
        item.addEventListener('click', () => closeMenu());
    });

    const smoothMobileLinks = [
      { linkId: 'mobile-features-link', section: 'features' },
      { linkId: 'mobile-how-link', section: 'how-it-works' }
    ];
    smoothMobileLinks.forEach(function(item) {
      var el = document.getElementById(item.linkId);
      if (el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          var target = document.getElementById(item.section);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          closeMenu();
        });
      }
    });
});


document.addEventListener('DOMContentLoaded', function() {

    function waitForLibraries() {
        return new Promise((resolve) => {
            const checkLibraries = () => {
                if (typeof html2canvas !== 'undefined' && 
                    (typeof window.jspdf !== 'undefined' || typeof window.jsPDF !== 'undefined')) {
                    resolve();
                } else {
                    setTimeout(checkLibraries, 100);
                }
            };
            checkLibraries();
        });
    }

    
    waitForLibraries().then(() => {
        initializeCVBuilder();
        if (window.AOS) {
            AOS.init({
                once: true,
                duration: 900,
                easing: 'ease-out-cubic',
            });
        }
    });

    function initializeCVBuilder() {
       
        const formPanel = document.querySelector('.form-panel');
        let currentZoom = 0.65;

        
        const educationTemplate = `
            <div class="education-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Degree</label>
                        <input type="text" class="input-edu-degree w-full" placeholder="e.g., Bachelor of Science">
                    </div>
                    <div>
                        <label>University</label>
                        <input type="text" class="input-edu-university w-full" placeholder="University name">
                    </div>
                    <div>
                        <label>Years</label>
                        <input type="text" class="input-edu-years w-full" placeholder="e.g., 2018 - 2022">
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" class="input-edu-location w-full" placeholder="City, Country">
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const projectTemplate = `
            <div class="project-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="space-y-4">
                    <div>
                        <label>Project Title</label>
                        <input type="text" class="input-project-title w-full" placeholder="Project name">
                    </div>
                    <div>
                        <label>Project Description</label>
                        <textarea class="input-project-desc w-full" rows="4" placeholder="Describe the project and your contributions"></textarea>
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const languageTemplate = `
            <div class="language-entry flex items-center gap-2 bg-gray-50 p-2 rounded">
                <input type="text" class="input-language w-full" placeholder="e.g., English">
                <select class="input-language-level border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Proficiency</option>
                    <option value="(Native)">Native</option>
                    <option value="(Fluent)">Fluent</option>
                    <option value="(Advanced)">Advanced</option>
                    <option value="(Intermediate)">Intermediate</option>
                    <option value="(Basic)">Basic</option>
                </select>
                <button type="button" class="remove-btn">&times;</button>
            </div>
        `;

        const socialTemplate = `
            <div class="social-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Platform</label>
                        <select class="input-social-platform w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">Select Platform</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Website">Website</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Display Name</label>
                        <input type="text" class="input-social-display w-full" placeholder="e.g., Ahmed Nada">
                    </div>
                    <div>
                        <label>Link (URL)</label>
                        <input type="text" class="input-social-link w-full" placeholder="e.g., https://linkedin.com/in/ahmed-nada">
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const experienceTemplate = `
            <div class="experience-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Job Title</label>
                        <input type="text" class="input-exp-title w-full" placeholder="e.g., Software Engineer">
                    </div>
                    <div>
                        <label>Company</label>
                        <input type="text" class="input-exp-company w-full" placeholder="Company name">
                    </div>
                    <div>
                        <label>Years</label>
                        <input type="text" class="input-exp-years w-full" placeholder="e.g., 2020 - 2023">
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" class="input-exp-location w-full" placeholder="City, Country">
                    </div>
                </div>
                <div class="mt-2">
                    <label>Description</label>
                    <textarea class="input-exp-desc w-full" rows="3" placeholder="Describe your responsibilities and achievements"></textarea>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const certificateTemplate = `
            <div class="certificate-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Certificate Name</label>
                        <input type="text" class="input-cert-name w-full" placeholder="e.g., PMP, AWS Certified">
                    </div>
                    <div>
                        <label>Issuer</label>
                        <input type="text" class="input-cert-issuer w-full" placeholder="e.g., PMI, Amazon">
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" class="input-cert-year w-full" placeholder="e.g., 2022">
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const courseTemplate = `
            <div class="course-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Course Name</label>
                        <input type="text" class="input-course-name w-full" placeholder="e.g., Data Science Bootcamp">
                    </div>
                    <div>
                        <label>Provider</label>
                        <input type="text" class="input-course-provider w-full" placeholder="e.g., Coursera, Udemy">
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" class="input-course-year w-full" placeholder="e.g., 2021">
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const awardTemplate = `
            <div class="award-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Award Title</label>
                        <input type="text" class="input-award-title w-full" placeholder="e.g., Employee of the Year">
                    </div>
                    <div>
                        <label>Issuer</label>
                        <input type="text" class="input-award-issuer w-full" placeholder="e.g., Company Name">
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" class="input-award-year w-full" placeholder="e.g., 2022">
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const organisationTemplate = `
            <div class="organisation-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Organisation Name</label>
                        <input type="text" class="input-org-name w-full" placeholder="e.g., IEEE, Red Cross">
                    </div>
                    <div>
                        <label>Role/Position</label>
                        <input type="text" class="input-org-role w-full" placeholder="e.g., Member, Volunteer">
                    </div>
                    <div>
                        <label>Years</label>
                        <input type="text" class="input-org-years w-full" placeholder="e.g., 2019 - 2022">
                    </div>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const publicationTemplate = `
            <div class="publication-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Title</label>
                        <input type="text" class="input-pub-title w-full" placeholder="e.g., Research Paper Title">
                    </div>
                    <div>
                        <label>Publisher/Journal</label>
                        <input type="text" class="input-pub-publisher w-full" placeholder="e.g., Nature, IEEE">
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="text" class="input-pub-year w-full" placeholder="e.g., 2020">
                    </div>
                </div>
                <div class="mt-2">
                    <label>Description</label>
                    <textarea class="input-pub-desc w-full" rows="2" placeholder="Short description or abstract"></textarea>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

        const referenceTemplate = `
            <div class="reference-entry p-4 border border-gray-200 rounded-lg relative bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>Name</label>
                        <input type="text" class="input-ref-name w-full" placeholder="e.g., Dr. Ahmed Ali">
                    </div>
                    <div>
                        <label>Position</label>
                        <input type="text" class="input-ref-position w-full" placeholder="e.g., Professor, Manager">
                    </div>
                    <div>
                        <label>Contact</label>
                        <input type="text" class="input-ref-contact w-full" placeholder="e.g., email or phone">
                    </div>
                </div>
                <div class="mt-2">
                    <label>Notes</label>
                    <textarea class="input-ref-notes w-full" rows="2" placeholder="Notes or relationship"></textarea>
                </div>
                <button type="button" class="remove-btn absolute top-3 right-3">&times;</button>
            </div>
        `;

       
        const sectionOrder = [
            'personal',
            'contact',
            'profile',
            'education',
            'skills',
            'projects',
            'languages',
            'experience',
            'certificates',
            'courses',
            'publications',
            'awards',
            'interests',
            'organisations',
            'references',
            'declaration'
        ];
        function saveSectionOrder() {
        }
        function renderSections() {
            const panel = document.querySelector('.form-panel');
            const allSections = Array.from(panel.querySelectorAll('.section-draggable'));
            sectionOrder.forEach(sec => {
                const el = allSections.find(s => s.dataset.section === sec);
                if (el) panel.appendChild(el);
            });
        }
        renderSections();

        let dragSrc = null;
        document.querySelectorAll('.section-draggable').forEach(section => {
            section.addEventListener('dragstart', function(e) {
                dragSrc = this;
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            section.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                dragSrc = null;
                document.querySelectorAll('.section-draggable').forEach(s => s.classList.remove('placeholder'));
            });
            section.addEventListener('dragover', function(e) {
                e.preventDefault();
                if (dragSrc && dragSrc !== this) {
                    this.classList.add('placeholder');
                }
            });
            section.addEventListener('dragleave', function() {
                this.classList.remove('placeholder');
            });
            section.addEventListener('drop', function(e) {
                e.preventDefault();
                if (dragSrc && dragSrc !== this) {
                    this.classList.remove('placeholder');
                    const panel = this.parentNode;
                    panel.insertBefore(dragSrc, this.nextSibling);
                    sectionOrder = Array.from(panel.querySelectorAll('.section-draggable')).map(s => s.dataset.section);
                    saveSectionOrder();
                    debouncedUpdatePreview();
                }
            });
        });

        formPanel.addEventListener('click', function(e) {
            const target = e.target;
            let containerId = null;
            let template = null;
            if (target.id === 'add-education-btn') {
                containerId = 'education-form-container';
                template = educationTemplate;
            } else if (target.id === 'add-project-btn') {
                containerId = 'projects-form-container';
                template = projectTemplate;
            } else if (target.id === 'add-language-btn') {
                containerId = 'languages-form-container';
                template = languageTemplate;
            } else if (target.id === 'add-social-btn') {
                containerId = 'social-links-container';
                template = socialTemplate;
            } else if (target.id === 'add-experience-btn') {
                containerId = 'experience-form-container';
                template = experienceTemplate;
            } else if (target.id === 'add-certificate-btn') {
                containerId = 'certificates-form-container';
                template = certificateTemplate;
            } else if (target.id === 'add-course-btn') {
                containerId = 'courses-form-container';
                template = courseTemplate;
            } else if (target.id === 'add-award-btn') {
                containerId = 'awards-form-container';
                template = awardTemplate;
            } else if (target.id === 'add-organisation-btn') {
                containerId = 'organisations-form-container';
                template = organisationTemplate;
            } else if (target.id === 'add-publication-btn') {
                containerId = 'publications-form-container';
                template = publicationTemplate;
            } else if (target.id === 'add-reference-btn') {
                containerId = 'references-form-container';
                template = referenceTemplate;
            } else if (target.classList.contains('remove-btn')) {
                target.closest('.education-entry, .project-entry, .language-entry, .social-entry, .experience-entry, .certificate-entry, .course-entry, .award-entry, .organisation-entry, .publication-entry, .reference-entry').remove();
                rebindDynamicListeners();
            }
            if(containerId && template) {
                document.getElementById(containerId).insertAdjacentHTML('beforeend', template);
                rebindDynamicListeners();
            }
        });

        setTimeout(() => {
        }, 500);

        document.getElementById('download-pdf-btn').addEventListener('click', async () => {
            try {
                if (typeof html2canvas === 'undefined') {
                    alert('html2canvas library not loaded. Please refresh and try again.');
                    return;
                }

                let jsPDF;
                if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
                    jsPDF = window.jspdf.jsPDF;
                } else if (typeof window.jsPDF !== 'undefined') {
                    jsPDF = window.jsPDF;
                } else {
                    try {
                        const script = document.createElement('script');
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                        script.onload = () => {
                            if (window.jspdf && window.jspdf.jsPDF) {
                                generatePDF(window.jspdf.jsPDF);
                            } else {
                                alert('Failed to load PDF library. Please refresh and try again.');
                            }
                        };
                        script.onerror = () => {
                            alert('Failed to load PDF library. Please check your internet connection and try again.');
                        };
                        document.head.appendChild(script);
                        return;
                    } catch (loadError) {
                        alert('Failed to load PDF library. Please refresh and try again.');
                        return;
                    }
                }

                if (jsPDF) {
                    generatePDF(jsPDF);
                }
            } catch (error) {
                console.error('Error in PDF download:', error);
                alert('An error occurred while preparing PDF download. Please try again.');
                document.getElementById('preview-loading').classList.add('hidden');
            }
        });

        async function generatePDF(jsPDF) {
            if (typeof jsPDF !== 'function') {
                console.warn('generatePDF called but jsPDF is not loaded or not a function. Suppressing error.');
                return;
            }
            try {
                const previewArea = document.getElementById('preview-area');
                const pages = previewArea.querySelectorAll('.page');
                
                if (pages.length === 0) {
                    alert('CV preview is empty. Please add some content first.');
                    return;
                }

                document.getElementById('preview-loading').classList.remove('hidden');
                
                const originalTransform = previewArea.style.transform;
                previewArea.style.transform = 'scale(1)';
                previewArea.classList.add('is-capturing');
                
                pages.forEach(page => {
                    page.style.display = 'block';
                    page.style.visibility = 'visible';
                    page.style.opacity = '1';
                });

                await new Promise(resolve => setTimeout(resolve, 800));

                const doc = new jsPDF('p', 'pt', 'a4', true);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = doc.internal.pageSize.getHeight();

                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    
                    await new Promise(resolve => setTimeout(resolve, 200));
                    
                    
                    const canvas = await html2canvas(page, {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: '#fff',
                        logging: false,
                        width: page.offsetWidth,
                        height: page.offsetHeight
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    if (i > 0) doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    
                    if (i === 0) {
                        const links = page.querySelectorAll('a[href]');
                        links.forEach(link => {
                            try {
                                const rect = link.getBoundingClientRect();
                                const pageRect = page.getBoundingClientRect();
                                
                                const scaleX = pdfWidth / page.offsetWidth;
                                const scaleY = pdfHeight / page.offsetHeight;
                                
                                const x = (rect.left - pageRect.left) * scaleX;
                                const y = (rect.top - pageRect.top) * scaleY;
                                const w = rect.width * scaleX;
                                const h = rect.height * scaleY;
                                const url = link.getAttribute('href');
                                
                                if (url && w > 5 && h > 5 && x >= 0 && y >= 0 && x < pdfWidth && y < pdfHeight) {
                                    doc.link(x, y, w, h, { url: url });
                                    console.log('Added interactive link:', url, 'at', x, y, w, h);
                                }
                            } catch (linkError) {
                                console.warn('Error adding link:', linkError);
                            }
                        });
                        
                        const emailLinks = page.querySelectorAll('a[href^="mailto:"]');
                        emailLinks.forEach(link => {
                            try {
                                const rect = link.getBoundingClientRect();
                                const pageRect = page.getBoundingClientRect();
                                
                                const scaleX = pdfWidth / page.offsetWidth;
                                const scaleY = pdfHeight / page.offsetHeight;
                                
                                const x = (rect.left - pageRect.left) * scaleX;
                                const y = (rect.top - pageRect.top) * scaleY;
                                const w = rect.width * scaleX;
                                const h = rect.height * scaleY;
                                const url = link.getAttribute('href');
                                
                                if (url && w > 5 && h > 5 && x >= 0 && y >= 0) {
                                    doc.link(x, y, w, h, { url: url });
                                    console.log('Added email link:', url);
                                }
                            } catch (linkError) {
                                console.warn('Error adding email link:', linkError);
                            }
                        });
                    }
                }

                pages.forEach(page => {
                    page.style.display = '';
                    page.style.visibility = '';
                    page.style.opacity = '';
                });

                doc.save('professional-cv.pdf');
                
                previewArea.style.transform = originalTransform;
                previewArea.classList.remove('is-capturing');
                document.getElementById('preview-loading').classList.add('hidden');
                
            } catch (error) {
                console.error('Error generating PDF:', error);
                document.getElementById('preview-loading').classList.add('hidden');
                const previewArea = document.getElementById('preview-area');
                previewArea.classList.remove('is-capturing');
                const pages = previewArea.querySelectorAll('.page');
                pages.forEach(page => {
                    page.style.display = '';
                    page.style.visibility = '';
                    page.style.opacity = '';
                });
            }
        }

        document.getElementById('download-jpg-btn').addEventListener('click', async () => {
            try {
                if (typeof html2canvas === 'undefined') {
                    alert('Required library not loaded. Please refresh and try again.');
                    return;
                }

                const previewArea = document.getElementById('preview-area');
                const pages = previewArea.querySelectorAll('.page');

                if (pages.length === 0) {
                    alert('CV preview is empty. Please add some content first.');
                    return;
                }

                const originalTransform = previewArea.style.transform;
                previewArea.style.transform = 'scale(1)';
                previewArea.classList.add('is-capturing');
                document.getElementById('preview-loading').classList.remove('hidden');
                
                await new Promise(resolve => setTimeout(resolve, 300));

                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    const canvas = await html2canvas(page, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        width: page.offsetWidth,
                        height: page.offsetHeight,
                        backgroundColor: '#ffffff'
                    });

                    const image = canvas.toDataURL('image/jpeg', 0.95);
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = `cv-page-${i + 1}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    if (i < pages.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                }

                previewArea.style.transform = originalTransform;
                previewArea.classList.remove('is-capturing');
                document.getElementById('preview-loading').classList.add('hidden');

            } catch (error) {
                console.error('Error in JPG generation:', error);
                alert('An error occurred while generating the JPG. Please try again.');
                document.getElementById('preview-loading').classList.add('hidden');
            }
        });

        document.getElementById('print-btn').addEventListener('click', function() {
            const previewArea = document.getElementById('preview-area');
            const originalTransform = previewArea.style.transform;
            previewArea.style.transform = 'scale(1)';
            
            setTimeout(() => {
                window.print();
                previewArea.style.transform = originalTransform;
            }, 300);
        });

        document.getElementById('zoom-in-btn').addEventListener('click', function() {
            const previewArea = document.getElementById('preview-area');
            currentZoom = Math.min(currentZoom + 0.05, 1);
            previewArea.style.transform = `scale(${currentZoom})`;
        });

        document.getElementById('zoom-out-btn').addEventListener('click', function() {
            const previewArea = document.getElementById('preview-area');
            currentZoom = Math.max(currentZoom - 0.05, 0.4);
            previewArea.style.transform = `scale(${currentZoom})`;
        });

        document.getElementById('zoom-reset-btn').addEventListener('click', function() {
            const previewArea = document.getElementById('preview-area');
            currentZoom = 0.65;
            previewArea.style.transform = `scale(${currentZoom})`;
        });

        
        window.scrollToBuilder = function() {
            const target = document.getElementById('cv-builder');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };


        window.scrollToFeatures = function() {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        };

        function createNewPage(container) {
            const page = document.createElement('div');
            page.className = 'page';
            const socialEntries = document.querySelectorAll('.social-entry');
            let socialLinksHTML = '';
            socialEntries.forEach(entry => {
                const platform = entry.querySelector('.input-social-platform').value;
                const display = entry.querySelector('.input-social-display')?.value.trim();
                const link = entry.querySelector('.input-social-link')?.value.trim();
                if (platform && (display || link)) {
                    let iconClass = 'fas fa-link';
                    switch(platform.toLowerCase()) {
                        case 'linkedin': iconClass = 'fab fa-linkedin'; break;
                        case 'github': iconClass = 'fab fa-github'; break;
                        case 'twitter': iconClass = 'fab fa-twitter'; break;
                        case 'instagram': iconClass = 'fab fa-instagram'; break;
                        case 'facebook': iconClass = 'fab fa-facebook'; break;
                        case 'portfolio': iconClass = 'fas fa-briefcase'; break;
                        case 'website': iconClass = 'fas fa-globe'; break;
                    }
                    if (link) {
                        socialLinksHTML += `<span><i class="${iconClass} text-black mr-1"></i><a href="${link}" target="_blank" rel="noopener">${display || link}</a></span>`;
                    } else {
                        socialLinksHTML += `<span><i class="${iconClass} text-black mr-1"></i>${display}</span>`;
                    }
                }
            });
            const headerHTML = `
                <header class="cv-header">
                    <h1>${document.getElementById('input-name').value || 'Your Name'}</h1>
                    <h2>${document.getElementById('input-title').value || 'Professional Title'}</h2>
                </header>
                <div class="cv-contact">
                    ${document.getElementById('input-email').value ? `<span><i class="fas fa-envelope text-black mr-1"></i><a href="mailto:${document.getElementById('input-email').value}" class="hover:underline">${document.getElementById('input-email').value}</a></span>` : ''}
                    ${document.getElementById('input-phone').value ? `<span><i class="fas fa-phone text-black mr-1"></i>${document.getElementById('input-phone').value}</span>` : ''}
                    ${document.getElementById('input-location').value ? `<span><i class="fas fa-map-marker-alt text-black mr-1"></i>${document.getElementById('input-location').value}</span>` : ''}
                    ${socialLinksHTML}
                </div>
                <main class="cv-body"></main>
            `;
            page.innerHTML = headerHTML;
            container.appendChild(page);
            return page;
        }

        let currentPreviewPage = 0;

        function showPreviewPage(idx) {
            const pages = document.querySelectorAll('#preview-area .page');
            pages.forEach((p, i) => {
                if (i === idx) {
                    p.classList.remove('hidden');
                } else {
                    p.classList.add('hidden');
                }
            });
            const nav = document.getElementById('preview-pagination');
            if (nav) {
                nav.innerHTML = '';
                if (pages.length > 1) {
                    const prevBtn = document.createElement('button');
                    prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
                    prevBtn.className = 'btn btn-outline mx-2';
                    prevBtn.disabled = idx === 0;
                    prevBtn.onclick = () => {
                        if (currentPreviewPage > 0) {
                            currentPreviewPage--;
                            showPreviewPage(currentPreviewPage);
                        }
                    };
                    nav.appendChild(prevBtn);
                    const pageInfo = document.createElement('span');
                    pageInfo.textContent = `Page ${idx + 1} of ${pages.length}`;
                    pageInfo.className = 'mx-2 font-semibold';
                    nav.appendChild(pageInfo);
                    const nextBtn = document.createElement('button');
                    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                    nextBtn.className = 'btn btn-outline mx-2';
                    nextBtn.disabled = idx === pages.length - 1;
                    nextBtn.onclick = () => {
                        if (currentPreviewPage < pages.length - 1) {
                            currentPreviewPage++;
                            showPreviewPage(currentPreviewPage);
                        }
                    };
                    nav.appendChild(nextBtn);
                }
            }
        }

        function updatePreview() {
            const previewArea = document.getElementById('preview-area');
            previewArea.innerHTML = '';
            document.getElementById('preview-loading').classList.remove('hidden');
            
            requestAnimationFrame(() => {
                setTimeout(() => {
                    function createNodeFromHTML(htmlString) {
                        const div = document.createElement('div');
                        div.innerHTML = htmlString.trim();
                        return div.firstChild;
                    }
                    
                    const contentNodes = {};
                    
                    const collectData = () => {
                        try {
                            const profileText = document.getElementById('input-profile').value.trim();
                            if (profileText) {
                                contentNodes.profile = createNodeFromHTML(`
                                    <div class="cv-section">
                                        <h3 id="preview-profile-title"><i class="fas fa-address-card text-black"></i>Profile</h3>
                                        <p>${profileText.replace(/\n/g, '<br>')}</p>
                                    </div>
                                `);
                            }
                            
                            const eduEntries = document.querySelectorAll('.education-entry');
                            if (eduEntries.length > 0) {
                                let eduHTML = `<div class="cv-section"><h3 id="preview-education-title"><i class="fas fa-graduation-cap text-black"></i>Education</h3>`;
                                eduEntries.forEach(entry => {
                                    const degree = entry.querySelector('.input-edu-degree').value.trim();
                                    const university = entry.querySelector('.input-edu-university').value.trim();
                                    const years = entry.querySelector('.input-edu-years').value.trim();
                                    const location = entry.querySelector('.input-edu-location').value.trim();
                                    if (degree || university || years || location) {
                                        eduHTML += `<div class="flex justify-between items-start mb-4"><div>${degree ? `<p class="font-semibold text-black">${degree}</p>` : ''}${university ? `<p class="text-black text-sm">${university}</p>` : ''}</div><div class="text-right">${years ? `<p class="font-semibold text-black">${years}</p>` : ''}${location ? `<p class="text-black text-sm">${location}</p>` : ''}</div></div>`;
                                        }
                                    });
                                    eduHTML += '</div>';
                                    contentNodes.education = createNodeFromHTML(eduHTML);
                                }
                                
                                const expEntries = document.querySelectorAll('.experience-entry');
                                if (expEntries.length > 0) {
                                    let expHTML = `<div class="cv-section"><h3 id="preview-experience-title"><i class="fas fa-briefcase text-black"></i>Professional Experience</h3>`;
                                    expEntries.forEach(entry => {
                                        const title = entry.querySelector('.input-exp-title').value.trim();
                                        const company = entry.querySelector('.input-exp-company').value.trim();
                                        const years = entry.querySelector('.input-exp-years').value.trim();
                                        const location = entry.querySelector('.input-exp-location').value.trim();
                                        const desc = entry.querySelector('.input-exp-desc').value.trim();
                                        if (title || company || years || location || desc) {
                                            expHTML += `<div class="mb-4"><div class="flex justify-between items-start"><div>${title ? `<p class="font-semibold text-black">${title}</p>` : ''}${company ? `<p class="text-black text-sm">${company}</p>` : ''}</div><div class="text-right">${years ? `<p class="font-semibold text-black">${years}</p>` : ''}${location ? `<p class="text-black text-sm">${location}</p>` : ''}</div></div>${desc ? `<p class="mt-1 text-sm leading-relaxed text-black">${desc.replace(/\n/g, '<br>')}</p>` : ''}</div>`;
                                        }
                                    });
                                    expHTML += '</div>';
                                    contentNodes.experience = createNodeFromHTML(expHTML);
                                }
                                
                                const skills = document.getElementById('input-skills').value.split(',').map(s => s.trim()).filter(Boolean);
                                if (skills.length > 0) {
                                    let skillsHTML = `<div class="cv-section"><h3 id="preview-skills-title"><i class="fas fa-tools text-black"></i>Skills</h3><div class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">`;
                                    skills.forEach(skill => {
                                        skillsHTML += `<span class="flex items-center"><i class="fas fa-check text-black mr-2 text-xs"></i>${skill}</span>`;
                                    });
                                    skillsHTML += '</div></div>';
                                    contentNodes.skills = createNodeFromHTML(skillsHTML);
                                }
                                
                                const langEntries = document.querySelectorAll('.language-entry');
                                const validLangs = [];
                                langEntries.forEach(entry => {
                                    const lang = entry.querySelector('.input-language').value.trim();
                                    const level = entry.querySelector('.input-language-level').value.trim();
                                    if (lang) {
                                        validLangs.push(`${lang} ${level}`);
                                    }
                                });
                                if (validLangs.length > 0) {
                                    let langsHTML = `<div class="cv-section"><h3 id="preview-languages-title"><i class="fas fa-language text-black"></i>Languages</h3><div class="flex flex-wrap gap-x-12 gap-y-2">`;
                                    validLangs.forEach(lang => {
                                        langsHTML += `<span class="flex items-center"><i class="fas fa-check text-black mr-2 text-xs"></i>${lang}</span>`;
                                    });
                                    langsHTML += '</div></div>';
                                    contentNodes.languages = createNodeFromHTML(langsHTML);
                                }
                                
                                const certEntries = document.querySelectorAll('.certificate-entry');
                                if (certEntries.length > 0) {
                                    let certHTML = `<div class="cv-section"><h3 id="preview-certificates-title"><i class="fas fa-certificate text-black"></i>Certificates</h3>`;
                                    certEntries.forEach(entry => {
                                        const name = entry.querySelector('.input-cert-name').value.trim();
                                        const issuer = entry.querySelector('.input-cert-issuer').value.trim();
                                        const year = entry.querySelector('.input-cert-year').value.trim();
                                        if (name || issuer || year) {
                                            certHTML += `<div class="flex justify-between items-start mb-2"><div>${name ? `<p class="font-semibold text-black">${name}</p>` : ''}${issuer ? `<p class="text-black text-sm">${issuer}</p>` : ''}</div><div class="text-right">${year ? `<p class="font-semibold text-black">${year}</p>` : ''}</div></div>`;
                                        }
                                    });
                                    certHTML += '</div>';
                                    contentNodes.certificates = createNodeFromHTML(certHTML);
                                }
                                
                                const interests = document.getElementById('input-interests').value.split(',').map(s => s.trim()).filter(Boolean);
                                if (interests.length > 0) {
                                    let interestsHTML = `<div class="cv-section"><h3 id="preview-interests-title"><i class="fas fa-heart text-black"></i>Interests</h3><div class="flex flex-wrap gap-x-8 gap-y-2">`;
                                    interests.forEach(interest => {
                                        interestsHTML += `<span class="flex items-center"><i class="fas fa-check text-black mr-2 text-xs"></i>${interest}</span>`;
                                    });
                                    interestsHTML += '</div></div>';
                                    contentNodes.interests = createNodeFromHTML(interestsHTML);
                                }
                                
                                const projectEntries = document.querySelectorAll('.project-entry');
                                let projectCount = 0;
                                if (projectEntries.length > 0) {
                                    let projectsHTML = `<div class="cv-section" data-section="projects"><h3 id="preview-projects-title"><i class="fas fa-folder-open text-black"></i>Projects</h3>`;
                                    projectEntries.forEach(entry => {
                                        const title = entry.querySelector('.input-project-title').value.trim();
                                        const desc = entry.querySelector('.input-project-desc').value.trim();
                                        if (title || desc) {
                                            projectsHTML += `<div class="project-item mb-4">${title ? `<h4 class="font-bold text-black">${title}</h4>` : ''}${desc ? `<p class=\"mt-1 text-sm leading-relaxed text-black\">${desc.replace(/\n/g, '<br>')}</p>` : ''}</div>`;
                                            projectCount++;
                                        }
                                    });
                                    projectsHTML += '</div>';
                                    if (projectCount > 0) {
                                        contentNodes.projects = createNodeFromHTML(projectsHTML);
                                    }
                                }
                                
                                const declaration = document.getElementById('input-declaration').value.trim();
                                if (declaration) {
                                    contentNodes.declaration = createNodeFromHTML(`
                                        <div class="cv-section">
                                            <h3 id="preview-declaration-title"><i class="fas fa-pen-fancy text-black"></i>Declaration</h3>
                                            <p>${declaration.replace(/\n/g, '<br>')}</p>
                                        </div>
                                    `);
                                }
                                
                                
                                const courseEntries = document.querySelectorAll('.course-entry');
                                if (courseEntries.length > 0) {
                                    let courseHTML = `<div class="cv-section"><h3 id="preview-courses-title"><i class="fas fa-book text-black"></i>Courses</h3>`;
                                    courseEntries.forEach(entry => {
                                        const name = entry.querySelector('.input-course-name').value.trim();
                                        const provider = entry.querySelector('.input-course-provider').value.trim();
                                        const year = entry.querySelector('.input-course-year').value.trim();
                                        if (name || provider || year) {
                                            courseHTML += `<div class="flex justify-between items-start mb-2"><div>${name ? `<p class="font-semibold text-black">${name}</p>` : ''}${provider ? `<p class="text-black text-sm">${provider}</p>` : ''}</div><div class="text-right">${year ? `<p class="font-semibold text-black">${year}</p>` : ''}</div></div>`;
                                        }
                                    });
                                    courseHTML += '</div>';
                                    contentNodes.courses = createNodeFromHTML(courseHTML);
                                }
                                
                                const pubEntries = document.querySelectorAll('.publication-entry');
                                if (pubEntries.length > 0) {
                                    let pubHTML = `<div class="cv-section"><h3 id="preview-publications-title"><i class="fas fa-book-open text-black"></i>Publications</h3>`;
                                    pubEntries.forEach(entry => {
                                        const title = entry.querySelector('.input-pub-title').value.trim();
                                        const publisher = entry.querySelector('.input-pub-publisher').value.trim();
                                        const year = entry.querySelector('.input-pub-year').value.trim();
                                        const desc = entry.querySelector('.input-pub-desc').value.trim();
                                        if (title || publisher || year || desc) {
                                            pubHTML += `<div class="mb-4"><div class="flex justify-between items-start"><div>${title ? `<p class="font-semibold text-black">${title}</p>` : ''}${publisher ? `<p class="text-black text-sm">${publisher}</p>` : ''}</div><div class="text-right">${year ? `<p class="font-semibold text-black">${year}</p>` : ''}</div></div>${desc ? `<p class="mt-1 text-sm leading-relaxed text-black">${desc.replace(/\n/g, '<br>')}</p>` : ''}</div>`;
                                        }
                                    });
                                    pubHTML += '</div>';
                                    contentNodes.publications = createNodeFromHTML(pubHTML);
                                }
                                
                                const awardEntries = document.querySelectorAll('.award-entry');
                                if (awardEntries.length > 0) {
                                    let awardHTML = `<div class="cv-section"><h3 id="preview-awards-title"><i class="fas fa-trophy text-black"></i>Awards</h3>`;
                                    awardEntries.forEach(entry => {
                                        const title = entry.querySelector('.input-award-title').value.trim();
                                        const issuer = entry.querySelector('.input-award-issuer').value.trim();
                                        const year = entry.querySelector('.input-award-year').value.trim();
                                        if (title || issuer || year) {
                                            awardHTML += `<div class="flex justify-between items-start mb-2"><div>${title ? `<p class="font-semibold text-black">${title}</p>` : ''}${issuer ? `<p class="text-black text-sm">${issuer}</p>` : ''}</div><div class="text-right">${year ? `<p class="font-semibold text-black">${year}</p>` : ''}</div></div>`;
                                        }
                                    });
                                    awardHTML += '</div>';
                                    contentNodes.awards = createNodeFromHTML(awardHTML);
                                }
                                
                                const orgEntries = document.querySelectorAll('.organisation-entry');
                                if (orgEntries.length > 0) {
                                    let orgHTML = `<div class="cv-section"><h3 id="preview-organisations-title"><i class="fas fa-users text-black"></i>Organisations</h3>`;
                                    orgEntries.forEach(entry => {
                                        const name = entry.querySelector('.input-org-name').value.trim();
                                        const role = entry.querySelector('.input-org-role').value.trim();
                                        const years = entry.querySelector('.input-org-years').value.trim();
                                        if (name || role || years) {
                                            orgHTML += `<div class="flex justify-between items-start mb-2"><div>${name ? `<p class="font-semibold text-black">${name}</p>` : ''}${role ? `<p class="text-black text-sm">${role}</p>` : ''}</div><div class="text-right">${years ? `<p class="font-semibold text-black">${years}</p>` : ''}</div></div>`;
                                        }
                                    });
                                    orgHTML += '</div>';
                                    contentNodes.organisations = createNodeFromHTML(orgHTML);
                                }
                                
                                const refEntries = document.querySelectorAll('.reference-entry');
                                if (refEntries.length > 0) {
                                    let refHTML = `<div class="cv-section"><h3 id="preview-references-title"><i class="fas fa-user-friends text-black"></i>References</h3>`;
                                    refEntries.forEach(entry => {
                                        const name = entry.querySelector('.input-ref-name').value.trim();
                                        const position = entry.querySelector('.input-ref-position').value.trim();
                                        const contact = entry.querySelector('.input-ref-contact').value.trim();
                                        const notes = entry.querySelector('.input-ref-notes').value.trim();
                                        if (name || position || contact || notes) {
                                            refHTML += `<div class="mb-4"><div class="flex justify-between items-start"><div>${name ? `<p class="font-semibold text-black">${name}</p>` : ''}${position ? `<p class="text-black text-sm">${position}</p>` : ''}</div></div>${contact ? `<p class="text-black text-sm">${contact}</p>` : ''}${notes ? `<p class="mt-1 text-sm leading-relaxed text-black">${notes.replace(/\n/g, '<br>')}</p>` : ''}</div>`;
                                        }
                                    });
                                    refHTML += '</div>';
                                    contentNodes.references = createNodeFromHTML(refHTML);
                                }
                                
                            } catch (error) {
                                console.error('Error collecting data:', error);
                            }
                        };
                        
                        collectData();
                        
                        const buildPages = () => {
                            try {
                                let currentPage = createNewPage(previewArea);
                                let body = currentPage.querySelector('.cv-body');
                                const availableHeight = body.clientHeight;
                                let hasContent = false;
                                
                                sectionOrder.forEach(section => {
                                    const node = contentNodes[section];
                                    if (!node) return;
                                    hasContent = true;
                                    
                                    if (section === 'projects' && node.dataset && node.dataset.section === 'projects') {
                                        const items = Array.from(node.querySelectorAll('.project-item'));
                                        let sectionHeader = node.querySelector('h3').outerHTML;
                                        let i = 0;
                                        while (i < items.length) {
                                            let sectionDiv = document.createElement('div');
                                            sectionDiv.className = 'cv-section';
                                            sectionDiv.innerHTML = sectionHeader;
                                            let list = document.createElement('div');
                                            sectionDiv.appendChild(list);
                                            let added = false;
                                            while (i < items.length) {
                                                list.appendChild(items[i].cloneNode(true));
                                                body.appendChild(sectionDiv);
                                                if (body.scrollHeight > availableHeight) {
                                                    list.removeChild(list.lastChild);
                                                    body.removeChild(sectionDiv);
                                                    break;
                                                }
                                                added = true;
                                                body.removeChild(sectionDiv);
                                                i++;
                                            }
                                            if (list.children.length > 0) {
                                                body.appendChild(sectionDiv);
                                            }
                                            if (i < items.length) {
                                                currentPage = createNewPage(previewArea);
                                                body = currentPage.querySelector('.cv-body');
                                            }
                                        }
                                    } else {
                                        body.appendChild(node);
                                        if (body.scrollHeight > availableHeight) {
                                            body.removeChild(node);
                                            currentPage = createNewPage(previewArea);
                                            body = currentPage.querySelector('.cv-body');
                                            body.appendChild(node);
                                        }
                                    }
                                });
                                
                                if (!hasContent) {
                                    createNewPage(previewArea);
                                }
                                
                                const pages = previewArea.querySelectorAll('.page');
                                pages.forEach((p, i) => {
                                    if (i === currentPreviewPage) {
                                        p.classList.remove('hidden');
                                    } else {
                                        p.classList.add('hidden');
                                    }
                                });
                                
                                let nav = document.getElementById('preview-pagination');
                                if (!nav) {
                                    nav = document.createElement('div');
                                    nav.id = 'preview-pagination';
                                    nav.className = 'flex justify-center items-center mb-4';
                                    const previewContainer = previewArea.parentElement;
                                    previewContainer.insertBefore(nav, previewArea);
                                }
                                showPreviewPage(currentPreviewPage);
                                
                                document.getElementById('preview-loading').classList.add('hidden');
                            } catch (error) {
                                console.error('Error building pages:', error);
                                document.getElementById('preview-loading').classList.add('hidden');
                            }
                        };
                        
                        setTimeout(buildPages, 50);
                        
                    }, 100); 
                });
            }

            

            
            let updatePreviewTimeout;
            function debouncedUpdatePreview() {
                clearTimeout(updatePreviewTimeout);
                updatePreviewTimeout = setTimeout(() => {
                    updatePreview();
                }, 500); 
            }

            function addLivePreviewListeners() {
               
                document.querySelectorAll('input, textarea, select').forEach(el => {
                    el.removeEventListener('input', debouncedUpdatePreview);
                    el.addEventListener('input', debouncedUpdatePreview);
                    el.removeEventListener('change', debouncedUpdatePreview);
                    el.addEventListener('change', debouncedUpdatePreview);
                });
            }

            
            function rebindDynamicListeners() {
                addLivePreviewListeners();
                debouncedUpdatePreview();
            }

          
            addLivePreviewListeners();
            debouncedUpdatePreview();
        }
    }
);


document.addEventListener('DOMContentLoaded', function() {
    var scrollToBuilder = window.scrollToBuilder;
    var scrollToFeatures = window.scrollToFeatures;
    if (document.getElementById('nav-get-started')) {
        document.getElementById('nav-get-started').addEventListener('click', scrollToBuilder);
    }
    if (document.getElementById('mobile-get-started')) {
        document.getElementById('mobile-get-started').addEventListener('click', scrollToBuilder);
    }
    if (document.getElementById('hero-get-started')) {
        document.getElementById('hero-get-started').addEventListener('click', scrollToBuilder);
    }
    if (document.getElementById('footer-get-started')) {
        document.getElementById('footer-get-started').addEventListener('click', scrollToBuilder);
    }
    if (document.getElementById('hero-learn-more')) {
        document.getElementById('hero-learn-more').addEventListener('click', scrollToFeatures);
    }
});


function smoothScrollToSection(e, sectionId) {
    e.preventDefault();
    var target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var smoothLinks = [
        { linkId: 'nav-features-link', section: 'features' },
        { linkId: 'nav-how-link', section: 'how-it-works' },
        { linkId: 'mobile-features-link', section: 'features' },
        { linkId: 'mobile-how-link', section: 'how-it-works' },
        { linkId: 'footer-features-link', section: 'features' },
        { linkId: 'footer-how-link', section: 'how-it-works' }
    ];
    smoothLinks.forEach(function(item) {
        var el = document.getElementById(item.linkId);
        if (el) {
            el.addEventListener('click', function(e) {
                smoothScrollToSection(e, item.section);
            });
        }
    });
});

function fixAOSForMobile() {
    const mobile = window.innerWidth <= 768;
    const sideAnimations = [
        'fade-left', 'fade-right', 'fade-down', 'flip-left', 'flip-right'
    ];
    const safeMobileAnim = 'fade-up';
    document.querySelectorAll('[data-aos]').forEach(el => {
        const aos = el.getAttribute('data-aos');
        if (mobile && sideAnimations.includes(aos)) {
            el.setAttribute('data-aos', safeMobileAnim);
        } else if (!mobile && el.dataset.aosOriginal) {
            el.setAttribute('data-aos', el.dataset.aosOriginal);
        }
    });
}
function storeAOSOriginals() {
    document.querySelectorAll('[data-aos]').forEach(el => {
        if (!el.dataset.aosOriginal) {
            el.dataset.aosOriginal = el.getAttribute('data-aos');
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    storeAOSOriginals();
    fixAOSForMobile();
    window.addEventListener('resize', fixAOSForMobile);
});

