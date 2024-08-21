import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdvDynamicComponent } from './idv-dynamic/idv-dynamic.component';
import { IdverseComponent } from './idverse/idverse.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { OnboardingManualComponent } from './onboarding-manual/onboarding-manual.component';
import { OnfidoComponent } from './onfido/onfido.component';
import { SardineComponent } from './sardine/sardine.component';
import { SmartUiComponent } from './smart-ui/smart-ui.component';
import { E2eIdvComponent } from './e2e-idv/e2e-idv.component';
import { E2eOcrBioComponent } from './e2e-ocr-bio/e2e-ocr-bio.component';

const routes: Routes = [
	{
		path: 'idv-dynamic',
		title: 'IDV Dynamic',
		component: IdvDynamicComponent
	},
	{
		path: 'idverse',
		title: 'IDVerse',
		component: IdverseComponent
	},
	{
		path: 'onboarding',
		title: 'Onboarding',
		component: OnboardingComponent
	},
	{
		path: 'onboarding-manual',
		title: 'Onboarding Manual',
		component: OnboardingManualComponent
	},
	{
		path: 'onfido',
		title: 'Onfido',
		component: OnfidoComponent
	},
	{
		path: 'sardine',
		title: 'Sardine',
		component: SardineComponent
	},
	{
		path: 'smartui',
		title: 'Smart UI',
		component: SmartUiComponent
	},
	{
		path: 'e2e-idv',
		title: 'E2E IDV',
		component: E2eIdvComponent
	},
	{
		path: 'e2e-ocr-bio',
		title: 'E2E OCR BIO',
		component: E2eOcrBioComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
