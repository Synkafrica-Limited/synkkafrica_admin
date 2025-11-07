"use client";

import { useEffect } from 'react';
import { integrationConfigs } from '@/models/entities/ticket-communication.entity';

/**
 * Third-Party Chat Widget Integration Component
 * Supports Intercom, Zendesk, and Freshdesk
 * 
 * Usage:
 * <ChatWidgetIntegration 
 *   provider="intercom" 
 *   user={{ id: "user123", name: "John Doe", email: "john@example.com" }}
 * />
 */
export default function ChatWidgetIntegration({ provider = 'intercom', user }) {
    useEffect(() => {
        if (provider === 'intercom' && integrationConfigs.intercom.enabled) {
            loadIntercom();
        } else if (provider === 'zendesk' && integrationConfigs.zendesk.enabled) {
            loadZendesk();
        } else if (provider === 'freshdesk' && integrationConfigs.freshdesk.enabled) {
            loadFreshdesk();
        }

        return () => {
            // Cleanup when component unmounts
            if (provider === 'intercom' && window.Intercom) {
                window.Intercom('shutdown');
            }
        };
    }, [provider, user]);

    const loadIntercom = () => {
        const config = integrationConfigs.intercom;
        
        // Intercom Settings
        window.intercomSettings = {
            api_base: "https://api-iam.intercom.io",
            app_id: config.appId,
            user_id: user?.id,
            name: user?.name,
            email: user?.email,
            created_at: Math.floor(Date.now() / 1000),
            // Custom data
            custom_data: {
                plan: user?.plan || 'free',
                total_bookings: user?.totalBookings || 0,
                last_booking: user?.lastBooking || null
            }
        };

        // Load Intercom script
        (function(){
            var w = window;
            var ic = w.Intercom;
            if (typeof ic === "function") {
                ic('reattach_activator');
                ic('update', w.intercomSettings);
            } else {
                var d = document;
                var i = function() {
                    i.c(arguments);
                };
                i.q = [];
                i.c = function(args) {
                    i.q.push(args);
                };
                w.Intercom = i;
                var l = function() {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/' + config.appId;
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === 'complete') {
                    l();
                } else if (w.attachEvent) {
                    w.attachEvent('onload', l);
                } else {
                    w.addEventListener('load', l, false);
                }
            }
        })();

        // Boot Intercom
        if (window.Intercom) {
            window.Intercom('boot', window.intercomSettings);
        }
    };

    const loadZendesk = () => {
        const config = integrationConfigs.zendesk;
        
        window.zESettings = {
            webWidget: {
                color: {
                    theme: '#FF6B35', // Orange theme
                    launcher: '#FF6B35',
                    launcherText: '#FFFFFF'
                },
                contactForm: {
                    fields: [
                        { id: 'name', prefill: { '*': user?.name || '' } },
                        { id: 'email', prefill: { '*': user?.email || '' } }
                    ]
                },
                launcher: {
                    chatLabel: {
                        'en-US': 'Need Help?'
                    }
                }
            }
        };

        // Load Zendesk widget
        const script = document.createElement('script');
        script.id = 'ze-snippet';
        script.src = `https://static.zdassets.com/ekr/snippet.js?key=${config.zendeskKey}`;
        script.async = true;
        document.body.appendChild(script);
    };

    const loadFreshdesk = () => {
        const config = integrationConfigs.freshdesk;
        
        window.fwSettings = {
            'widget_id': config.widgetId,
            'locale': 'en'
        };
        
        // Prefill user data
        if (user) {
            window.fwSettings.properties = {
                name: user.name,
                email: user.email,
                user_id: user.id
            };
        }

        // Load Freshdesk widget
        !(function() {
            if ("function" != typeof window.FreshworksWidget) {
                var n = function() {
                    n.q.push(arguments);
                };
                n.q = [];
                window.FreshworksWidget = n;
            }
        })();

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://widget.freshworks.com/widgets/${config.widgetId}.js`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    };

    // This component doesn't render anything visible
    return null;
}

// Hook for programmatically controlling the chat widget
export const useChatWidget = () => {
    const showChat = () => {
        if (window.Intercom) {
            window.Intercom('show');
        } else if (window.zE) {
            window.zE('messenger', 'open');
        } else if (window.FreshworksWidget) {
            window.FreshworksWidget('open');
        }
    };

    const hideChat = () => {
        if (window.Intercom) {
            window.Intercom('hide');
        } else if (window.zE) {
            window.zE('messenger', 'close');
        } else if (window.FreshworksWidget) {
            window.FreshworksWidget('close');
        }
    };

    const sendMessage = (message) => {
        if (window.Intercom) {
            window.Intercom('showNewMessage', message);
        } else if (window.zE) {
            window.zE('messenger', 'open');
            // Zendesk doesn't support pre-filled messages via API
        } else if (window.FreshworksWidget) {
            window.FreshworksWidget('open');
            // Freshdesk doesn't support pre-filled messages via API
        }
    };

    const updateUser = (userData) => {
        if (window.Intercom) {
            window.Intercom('update', userData);
        } else if (window.zE) {
            window.zE('messenger', 'loginUser', function(callback) {
                callback(userData.email);
            });
        }
    };

    return {
        showChat,
        hideChat,
        sendMessage,
        updateUser
    };
};
