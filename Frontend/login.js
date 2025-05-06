document.addEventListener('DOMContentLoaded', function() {
    const writerSelector = document.getElementById('writer-selector');
    const readerSelector = document.getElementById('reader-selector');
    const writerForm = document.querySelector('.writer-form');
    const readerForm = document.querySelector('.reader-form');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');
    const roleButtons = document.querySelectorAll('.select-role-btn');
    
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            if (role === 'writer') {
                writerSelector.style.display = 'none';
                writerForm.classList.add('active');
                document.querySelector('.left-page').style.transform = 'rotateY(-5deg)';
                animatePageTexture('.left-page::before');
            } else if (role === 'reader') {
                readerSelector.style.display = 'none';
                readerForm.classList.add('active');
                document.querySelector('.right-page').style.transform = 'rotateY(5deg)';
                animatePageTexture('.right-page::before');
            }
        });
    });
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            const page = this.closest('.page');
            page.style.transform = 'scale(1.01)';
            setTimeout(() => {
                page.style.transform = '';
            }, 300);
        });
    });
    
    // Form_submission
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.textContent = 'Success!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    console.log('Form submitted:', this.id);
                    alert('Form submitted successfully!!');
                }, 1000);
            }, 1500);
        });
    });

    function animatePageTexture(selector) {
        const style = document.createElement('style');
        style.textContent = `
            ${selector} {
                animation: textureMove 2s ease-out forwards;
            }
            
            @keyframes textureMove {
                0% { background-position: 0% 0%; }
                50% { background-position: 2% 1%; }
                100% { background-position: 0% 0%; }
            }
        `;
        document.head.appendChild(style);
        setTimeout(() => {
            document.head.removeChild(style);
        }, 2000);
    }
    function playPageTurn() {
        console.log('Page turning sound would play here');
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.addEventListener('mouseenter', function() {
            if (page.classList.contains('left-page')) {
                this.style.transform = 'rotateY(-2deg)';
            } else {
                this.style.transform = 'rotateY(2deg)';
            }
        });
        
        page.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // InkAnimation_On_Writerside
    const writerInputs = document.querySelectorAll('.writer-page input, .writer-page textarea');
    writerInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 2px rgba(44, 36, 23, 0.1)';
            this.style.borderColor = '#2c2417';
            const inkSpot = document.createElement('div');
            inkSpot.className = 'ink-spot';
            inkSpot.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background-color: rgba(44, 36, 23, 0.2);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -50%);
                animation: inkSpread 1.5s ease-out forwards;
            `;
            
            const rect = this.getBoundingClientRect();
            inkSpot.style.left = rect.left + 10 + 'px';
            inkSpot.style.top = rect.top + 10 + 'px';
            
            document.body.appendChild(inkSpot);
            setTimeout(() => {
                document.body.removeChild(inkSpot);
            }, 1500);
        });
    });
    
    const inkStyle = document.createElement('style');
    inkStyle.textContent = `
        @keyframes inkSpread {
            0% { 
                width: 5px; 
                height: 5px; 
                opacity: 0.7; 
            }
            100% { 
                width: 50px; 
                height: 50px; 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(inkStyle);
    
    //PageAnimation
    setTimeout(() => {
        document.querySelector('.left-page').style.transform = 'rotateY(-3deg)';
        document.querySelector('.right-page').style.transform = 'rotateY(3deg)';
        
        setTimeout(() => {
            document.querySelector('.left-page').style.transform = '';
            document.querySelector('.right-page').style.transform = '';
        }, 1000);
    }, 500);
});