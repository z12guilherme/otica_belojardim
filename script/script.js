// Configuration object
const defaultConfig = {
    company_name: "Ótica Belo Jardim",
    hero_title: "Visão clara, estilo único",
    hero_subtitle: "Lentes de qualidade e armações exclusivas para seu perfil de rosto",
    stores_title: "Nossas Lojas",
    newsletter_title: "Cadastre-se e receba novidades em seu e-mail",
    copyright_text: "Copyright © 2024 Ótica Belo Jardim. Todos os direitos reservados.",
    background_color: "#FFFFFF", // Header background
    surface_color: "#ffffff",
    text_color: "#374151", 
    primary_action_color: "#1e40af", // Azul (blue-800)
    secondary_action_color: "#1e3a8a", // Azul mais escuro (blue-900)
    font_family: "Inter",
    font_size: 16
};

// Newsletter form handler
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('newsletter-message');
    messageDiv.textContent = 'Obrigado! Você receberá nossas novidades em breve.';
    messageDiv.className = 'mt-4 text-center bg-green-100 text-green-800 px-4 py-2 rounded-lg';
    messageDiv.classList.remove('hidden');
    
    // Reset form
    event.target.reset();
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Element SDK implementation
async function onConfigChange(config) {
    const companyName = config.company_name || defaultConfig.company_name;
    const heroTitle = config.hero_title || defaultConfig.hero_title;
    const heroSubtitle = config.hero_subtitle || defaultConfig.hero_subtitle;
    const storesTitle = config.stores_title || defaultConfig.stores_title;
    const newsletterTitle = config.newsletter_title || defaultConfig.newsletter_title;
    const copyrightText = config.copyright_text || defaultConfig.copyright_text;
    
    // Update text content
    // company-name é agora uma imagem. hero-title e hero-subtitle não são mais exibidos diretamente.
    document.getElementById('stores-title').textContent = storesTitle;
    document.getElementById('newsletter-title').textContent = newsletterTitle;
    document.getElementById('copyright-text').textContent = copyrightText;
    
    // Apply colors
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const header = document.getElementById('main-header');
    if (header) header.style.backgroundColor = backgroundColor;

    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
    const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    
    // O gradiente não é mais usado, mas o código pode ser mantido para o SDK
    
    // Update surface colors
    document.querySelectorAll('.bg-white').forEach(el => {
        el.style.backgroundColor = surfaceColor;
    });
    
    // Update text colors
    document.querySelectorAll('.text-gray-800, .text-gray-600, #main-header, #main-header a').forEach(el => {
        el.style.color = textColor;
    });
    
    // Update primary action colors
    document.querySelectorAll('.text-blue-800, .bg-blue-800, .text-purple-600, .bg-purple-600').forEach(el => {
        if (el.classList.contains('bg-blue-800') || el.classList.contains('bg-purple-600')) {
            el.style.backgroundColor = primaryActionColor;
        } else {
            el.style.color = primaryActionColor;
        }
    });
    document.querySelectorAll('.hover\\:text-blue-800, .hover\\:text-purple-600').forEach(el => {
        el.style.color = primaryActionColor;
    });
    
    // Apply font settings
    const customFont = config.font_family || defaultConfig.font_family;
    const baseSize = config.font_size || defaultConfig.font_size;
    const baseFontStack = 'system-ui, -apple-system, sans-serif';
    
    document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
    document.body.style.fontSize = `${baseSize}px`;
    
    // Scale headings proportionally
    document.querySelectorAll('h1').forEach(el => {
        el.style.fontSize = `${baseSize * 1.5}px`;
    });
    document.querySelectorAll('h2').forEach(el => {
        el.style.fontSize = `${baseSize * 2.5}px`;
    });
    document.querySelectorAll('h3').forEach(el => {
        el.style.fontSize = `${baseSize * 2}px`;
    });
    document.querySelectorAll('h4').forEach(el => {
        el.style.fontSize = `${baseSize * 1.25}px`;
    });
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ background_color: value });
                    }
                }
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                    config.surface_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ surface_color: value });
                    }
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    config.text_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            },
            {
                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => {
                    config.primary_action_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ primary_action_color: value });
                    }
                }
            },
            {
                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                set: (value) => {
                    config.secondary_action_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ secondary_action_color: value });
                    }
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                if (window.elementSdk) {
                    window.elementSdk.setConfig({ font_family: value });
                }
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                config.font_size = value;
                if (window.elementSdk) {
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["company_name", config.company_name || defaultConfig.company_name],
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle], 
        ["stores_title", config.stores_title || defaultConfig.stores_title],
        ["newsletter_title", config.newsletter_title || defaultConfig.newsletter_title],
        ["copyright_text", config.copyright_text || defaultConfig.copyright_text] 
    ]);
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// Inicializa a biblioteca de animações
AOS.init({
    duration: 800, // Duração da animação em ms
    once: true,    // A animação acontece apenas uma vez
});

// Inicializa o Carrossel 3D (Swiper)
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});