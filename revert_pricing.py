import re

def update_html():
    with open('index.html', 'r') as f:
        html = f.read()

    # 1. Update Navbar Links
    html = html.replace('<a href="#get-quote">Submit Project</a>', '<a href="#pricing">Pricing</a>')

    # 2. Define the Restored Pricing Section with Free Sample
    pricing_section = """
    <!-- Pricing Section -->
    <section id="pricing" class="section dark-section" style="border-top: 1px solid rgba(255,255,255,0.1);">
        <div class="container">
            <h2 class="section-title animate-on-scroll">Transparent, Complexity-Based Pricing</h2>
            <p class="animate-on-scroll" style="color: #fff; margin-bottom: 3rem;">We don't believe in one-size-fits-all bundles. Every model is priced according to its gross floor area, geometry, and required level of detail.</p>
            <div class="pricing-grid">
                
                <!-- Free Pilot Sample -->
                <div class="pricing-card white-card animate-on-scroll delay-100" style="border: 3px solid var(--accent-gold); position: relative;">
                    <div style="position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background: var(--accent-gold); color: var(--primary-dark); padding: 5px 20px; border-radius: 20px; font-weight: bold; font-size: 0.95rem; white-space: nowrap;">Free Sample</div>
                    <h3>Free Pilot Project</h3>
                    <div class="price"><span class="dynamic-price" data-eur="0">€0</span><span>first project</span></div>
                    <p>Test our quality with zero commitment. Send us your most complex legacy plan or backlog bottleneck.</p>
                    <hr>
                    <p>Includes full LOD 200/300 conversion and QA pass so you can evaluate our standards.</p>
                    <p class="turnaround"><strong>48 Hours</strong></p>
                </div>

                <div class="pricing-card white-card animate-on-scroll delay-200">
                    <h3>Single-Family & Small Residential</h3>
                    <div class="price"><span class="dynamic-price" data-eur="59">€59</span> – <span class="dynamic-price" data-eur="99">€99</span><span>per project</span></div>
                    <p>Ideal for energy consultants, private architects, renovation planning.</p>
                    <hr>
                    <p>Exterior & interior envelope, wall/window/roof geometry, IFC + native files.</p>
                    <p class="turnaround"><strong>24–48 Hours</strong></p>
                </div>
                
                <div class="pricing-card white-card animate-on-scroll delay-300">
                    <h3>Multi-Story Residential & Apartments</h3>
                    <div class="price"><span class="dynamic-price" data-eur="199">€199</span> – <span class="dynamic-price" data-eur="499">€499</span>+<span>by floors & complexity</span></div>
                    <p>Ideal for property developers, real estate agencies, multi-family renovations.</p>
                    <hr>
                    <p>Full multi-story volume, floor-by-floor zoning, door/window schedules.</p>
                    <p class="turnaround"><strong>3–5 Business Days</strong></p>
                </div>
                
                <div class="pricing-card white-card animate-on-scroll delay-400">
                    <h3>Studio Retainer</h3>
                    <div class="price">From <span class="dynamic-price" data-eur="1799">€1,799</span><span>per month</span></div>
                    <p>Ideal for growing studios & energy audit practices needing dedicated weekly capacity.</p>
                    <hr>
                    <p>Custom monthly volume — no local hiring costs.</p>
                    <p class="turnaround"><strong>Ongoing capacity</strong></p>
                </div>

            </div>
        </div>
    </section>
    """

    # 3. Replace the Submission Form with Pricing
    pattern_form = r'<!-- Project Submission & Query Form -->.*?</section>'
    html = re.sub(pattern_form, pricing_section, html, flags=re.DOTALL)

    with open('index.html', 'w') as f:
        f.write(html)


def restore_js():
    with open('script.js', 'r') as f:
        js = f.read()

    currency_logic = """
        // --- 2. Auto Currency Conversion ---
        const userCurrency = geoData.currency;
        if (userCurrency && userCurrency !== 'EUR') {
            const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
            const rateData = await rateRes.json();
            const conversionRate = rateData.rates[userCurrency];

            if (conversionRate) {
                const formatter = new Intl.NumberFormat(geoData.languages.split(',')[0], {
                    style: 'currency',
                    currency: userCurrency,
                    maximumFractionDigits: 0
                });

                document.querySelectorAll('.dynamic-price').forEach(el => {
                    const eurValue = parseFloat(el.getAttribute('data-eur'));
                    const convertedValue = eurValue * conversionRate;
                    el.innerText = formatter.format(convertedValue);
                });
            }
        }
    } catch (error) {"""
    
    # Inject it back before the catch block
    js = re.sub(r'    \} catch \(error\) \{', currency_logic, js, count=1)
    
    with open('script.js', 'w') as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    restore_js()
    print("Pricing restored and submission form removed.")
